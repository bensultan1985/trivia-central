/**
 * Trivia Question Generator Script
 *
 * This script generates trivia questions using AI and seeds them into the database.
 * It runs 100 iterations, each time selecting a random category and generating
 * a trivia question with 4 multiple choice answers.
 *
 * Usage:
 *   npm run generate-trivia
 *
 * Environment variables required:
 *   - OPENAI_API_KEY: Your OpenAI API key
 *   - DATABASE_URL: PostgreSQL database connection string
 */

import "./loadEnv";

import crypto from "node:crypto";
import { PrismaClient } from "@prisma/client";
import { getRandomLeafCategory, specialQuestions } from "./triviaCategories";

const prisma = new PrismaClient();

interface TriviaQuestionData {
  question: string;
  choices: string[];
  correctAnswerIndex: number;
  citations: string[];
  questionContext?: string;
  answerContext?: string;
  tags: string[];
  importance: number;
  commonKnowledgeUserDateRange?: number[] | null;
}

type BatchRequestMeta = {
  customId: string;
  categoryPath: string;
  categoryItem: string;
  attempt: number;
};

function normalizeBirthYearRange(value: unknown): number[] | null {
  if (value == null) return null;
  if (!Array.isArray(value)) return null;

  const normalized = value
    .map((v) => {
      if (v == null) return null;
      if (typeof v === "number")
        return Number.isFinite(v) ? Math.trunc(v) : null;
      if (typeof v === "string") {
        const s = v.trim().toLowerCase();
        if (s === "present" || s === "now" || s === "current") return "present";
        const n = Number(s);
        return Number.isFinite(n) ? Math.trunc(n) : null;
      }
      return null;
    })
    .filter((v) => v !== null);

  const earliest = normalized.find((v) => typeof v === "number") as
    | number
    | undefined;
  if (earliest == null) return null;

  // If the second value is explicitly "present", omit it (store only [earliest])
  if (normalized.some((v) => v === "present")) return [earliest];

  const numericYears = normalized.filter(
    (v): v is number => typeof v === "number",
  );
  if (numericYears.length <= 1) return [earliest];

  const latest = Math.max(...numericYears);
  if (latest === earliest) return [earliest];
  return [earliest, latest];
}

function normalizeForDedupe(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim()
    .replace(/[^a-z0-9 ]+/g, "")
    .replace(/\s+/g, " ");
}

function triviaFingerprint(question: string, correctAnswer: string): string {
  const q = normalizeForDedupe(question);
  const a = normalizeForDedupe(correctAnswer);
  const raw = `${q}|${a}`;
  return crypto.createHash("sha256").update(raw).digest("hex");
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const specialQuestionRegex = new RegExp(
  `\\b(?:${specialQuestions.map(escapeRegex).join("|")})\\b`,
  "i",
);

function isSpecialQuestion(question: string): boolean {
  return specialQuestionRegex.test(question);
}

async function questionExistsInDb(question: string): Promise<boolean> {
  const existing = await prisma.triviaQuestion.findFirst({
    where: {
      question: {
        equals: question.trim(),
        mode: "insensitive",
      },
    },
    select: { id: true },
  });

  return Boolean(existing);
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getOpenAiApiKey(): string | null {
  return process.env.OPENAI_API_KEY ?? process.env.openai_api_key ?? null;
}

function extractJsonFromModelContent(content: string): string {
  const jsonMatch =
    content.match(/```json\n([\s\S]*?)\n```/) ||
    content.match(/```([\s\S]*?)```/);
  return (jsonMatch ? jsonMatch[1] : content).trim();
}

function buildPrompt(categoryPath: string, categoryItem: string): string {
  const leafKey = categoryPath.split("/").filter(Boolean).pop() ?? categoryPath;
  const isWildcardTopic = categoryItem.trim() === "**";
  const topicPhrase = isWildcardTopic
    ? `any topic related to "${leafKey}" (you choose a specific example)`
    : `"${categoryItem}"`;

  return `Generate a trivia question about ${topicPhrase} in the category "${categoryPath}".

${isWildcardTopic ? 'Important: "**" is a wildcard marker in our category list. Pick a concrete topic and do NOT mention "**" in the question or answers.' : ""}

Requirements:
1. Create a clear, interesting trivia question
2. Provide exactly 4 multiple choice answers
3. One answer must be correct
4. When possible, one incorrect answer should be close to the correct answer
5. Provide 1-2 credible sources/citations for the answer
6. Rate the importance (1-10) based on likelihood it would appear on a trivia show (1=unlikely, 10=very likely)
7. If found in actual game shows, importance should be above 8
8. Provide relevant tags/keywords
9. If applicable and reasonably certain, provide the likely birth-year range of people who would know this (NOT age). Otherwise null.
  - Use either null OR an array of 1-2 integers
  - If the latest end is effectively "present", OMIT it and return only [earliestBirthYear]
  - Do NOT include nulls in arrays
10. If helpful, provide additional context about the question or answer

Return a JSON object with this structure:
{
  "question": "string",
  "choices": ["choice1", "choice2", "choice3", "choice4"],
  "correctAnswerIndex": 0,
  "citations": ["source1", "source2"],
  "questionContext": "optional context about the question",
  "answerContext": "optional context about the answer",
  "tags": ["tag1", "tag2"],
  "importance": 5,
  "commonKnowledgeUserDateRange": null
}`;
}

function buildChatCompletionBody(prompt: string, attempt: number): object {
  const presencePenalty = attempt >= 2 ? 1.0 : 0.6;
  const frequencyPenalty = attempt >= 2 ? 0.7 : 0.2;

  return {
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content:
          "You are a trivia question expert. Generate high-quality trivia questions with accurate information and credible sources. Always return valid JSON.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.8,
    presence_penalty: presencePenalty,
    frequency_penalty: frequencyPenalty,
    max_tokens: 1000,
  };
}

function isValidTriviaData(value: any): value is TriviaQuestionData {
  if (!value) return false;
  if (typeof value.question !== "string" || value.question.trim() === "")
    return false;
  if (!Array.isArray(value.choices) || value.choices.length !== 4) return false;
  if (typeof value.correctAnswerIndex !== "number") return false;
  if (
    !Number.isInteger(value.correctAnswerIndex) ||
    value.correctAnswerIndex < 0 ||
    value.correctAnswerIndex > 3
  )
    return false;
  return true;
}

async function openaiFetchJson(
  url: string,
  init: RequestInit,
): Promise<any | null> {
  try {
    const response = await fetch(url, init);
    if (!response.ok) {
      const text = await response.text().catch(() => "");
      console.error(
        `OpenAI API error: ${response.status} ${response.statusText}`,
      );
      if (text) console.error(text);
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error("OpenAI request failed:", error);
    return null;
  }
}

async function uploadBatchInputFile(
  openaiApiKey: string,
  jsonlContent: string,
): Promise<string | null> {
  const form = new FormData();
  const blob = new Blob([jsonlContent], { type: "application/jsonl" });

  form.append("purpose", "batch");
  // undici supports providing a filename as the 3rd argument
  form.append("file", blob, "trivia-batch.jsonl");

  const data = await openaiFetchJson("https://api.openai.com/v1/files", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${openaiApiKey}`,
    },
    body: form,
  });

  return data?.id ?? null;
}

async function createBatchJob(
  openaiApiKey: string,
  inputFileId: string,
): Promise<string | null> {
  const data = await openaiFetchJson("https://api.openai.com/v1/batches", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${openaiApiKey}`,
    },
    body: JSON.stringify({
      input_file_id: inputFileId,
      endpoint: "/v1/chat/completions",
      completion_window: "24h",
      metadata: { source: "trivia-train/scripts/generateTrivia.ts" },
    }),
  });

  return data?.id ?? null;
}

async function getBatchStatus(
  openaiApiKey: string,
  batchId: string,
): Promise<any | null> {
  return await openaiFetchJson(`https://api.openai.com/v1/batches/${batchId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${openaiApiKey}`,
    },
  });
}

async function fetchOpenAiFileContent(
  openaiApiKey: string,
  fileId: string,
): Promise<string | null> {
  try {
    const response = await fetch(
      `https://api.openai.com/v1/files/${fileId}/content`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${openaiApiKey}`,
        },
      },
    );

    if (!response.ok) {
      console.error(
        `OpenAI file download error: ${response.status} ${response.statusText}`,
      );
      return null;
    }

    return await response.text();
  } catch (error) {
    console.error("Error downloading OpenAI file:", error);
    return null;
  }
}

async function submitBatchAndWaitForOutput(
  openaiApiKey: string,
  requests: BatchRequestMeta[],
): Promise<{ batchId: string; outputJsonl: string | null } | null> {
  const jsonl =
    requests
      .map((req) => {
        const prompt = buildPrompt(req.categoryPath, req.categoryItem);
        return JSON.stringify({
          custom_id: req.customId,
          method: "POST",
          url: "/v1/chat/completions",
          body: buildChatCompletionBody(prompt, req.attempt),
        });
      })
      .join("\n") + "\n";

  const inputFileId = await uploadBatchInputFile(openaiApiKey, jsonl);
  if (!inputFileId) return null;

  const batchId = await createBatchJob(openaiApiKey, inputFileId);
  if (!batchId) return null;

  console.log(`Submitted OpenAI batch: ${batchId}`);
  console.log(`Waiting for batch completion (may take a while)...`);

  // Poll until completed (Batch API is async and can take minutes+)
  let delayMs = 2000;
  for (;;) {
    await sleep(delayMs);
    delayMs = Math.min(10000, Math.round(delayMs * 1.4));

    const status = await getBatchStatus(openaiApiKey, batchId);
    if (!status) return { batchId, outputJsonl: null };

    const state = status.status as string | undefined;
    const completed = state === "completed";
    const terminalFailure =
      state === "failed" || state === "cancelled" || state === "expired";

    if (!completed && !terminalFailure) {
      process.stdout.write(`. (${state ?? "unknown"})`);
      continue;
    }

    process.stdout.write("\n");

    if (terminalFailure) {
      console.error(`Batch ended with status: ${state}`);
      const errorFileId = status.error_file_id as string | null | undefined;
      if (errorFileId) {
        const err = await fetchOpenAiFileContent(openaiApiKey, errorFileId);
        if (err) console.error(err);
      }
      return { batchId, outputJsonl: null };
    }

    const outputFileId = status.output_file_id as string | null | undefined;
    if (!outputFileId) {
      console.error("Batch completed but no output_file_id was provided.");
      return { batchId, outputJsonl: null };
    }

    const outputJsonl = await fetchOpenAiFileContent(
      openaiApiKey,
      outputFileId,
    );
    return { batchId, outputJsonl };
  }
}

/**
 * Generate a trivia question using OpenAI API
 */
async function generateTriviaQuestion(
  categoryPath: string,
  categoryItem: string,
  attempt: number = 1,
): Promise<TriviaQuestionData | null> {
  try {
    const openaiApiKey = getOpenAiApiKey();
    if (!openaiApiKey) {
      console.error(
        "Missing OpenAI API key. Set OPENAI_API_KEY (preferred) or openai_api_key in your env.",
      );
      return null;
    }

    const prompt = buildPrompt(categoryPath, categoryItem);

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify(buildChatCompletionBody(prompt, attempt)),
    });

    if (!response.ok) {
      console.error(
        `OpenAI API error: ${response.status} ${response.statusText}`,
      );
      return null;
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    const triviaData = JSON.parse(extractJsonFromModelContent(content));

    triviaData.commonKnowledgeUserDateRange = normalizeBirthYearRange(
      triviaData.commonKnowledgeUserDateRange,
    );

    if (!isValidTriviaData(triviaData)) {
      console.error("Invalid response format from OpenAI");
      return null;
    }

    return triviaData;
  } catch (error) {
    console.error("Error generating trivia question:", error);
    return null;
  }
}

/**
 * Save a trivia question to the database
 */
async function saveTriviaQuestion(
  categoryPath: string,
  triviaData: TriviaQuestionData,
): Promise<boolean> {
  try {
    const correctAnswer = triviaData.choices[triviaData.correctAnswerIndex];
    const wrongAnswers = triviaData.choices.filter(
      (_, index) => index !== triviaData.correctAnswerIndex,
    );

    await prisma.triviaQuestion.create({
      data: {
        question: triviaData.question,
        specialQuestion: isSpecialQuestion(triviaData.question),
        correctAnswer: correctAnswer,
        wrongAnswer1: wrongAnswers[0] || "",
        wrongAnswer2: wrongAnswers[1] || "",
        wrongAnswer3: wrongAnswers[2] || "",
        category: categoryPath.split("/")[0], // Top-level category
        categoryPath: categoryPath,
        difficulty: "medium", // Default difficulty
        citations: triviaData.citations || [],
        engagement: 0,
        choice1Count: 0,
        choice2Count: 0,
        choice3Count: 0,
        choice4Count: 0,
        upvotes: 0,
        downvotes: 0,
        questionContext: triviaData.questionContext || null,
        answerContext: triviaData.answerContext || null,
        tags: triviaData.tags || [],
        importance: triviaData.importance || 5,
        ...(Array.isArray(triviaData.commonKnowledgeUserDateRange) &&
        triviaData.commonKnowledgeUserDateRange.length > 0
          ? {
              commonKnowledgeUserDateRange:
                triviaData.commonKnowledgeUserDateRange,
            }
          : {}),
      },
    });

    return true;
  } catch (error) {
    console.error("Error saving trivia question to database:", error);
    return false;
  }
}

/**
 * Main function to generate trivia questions
 */
async function generateTriviaQuestions(
  iterations: number = 100,
): Promise<void> {
  const openaiApiKey = getOpenAiApiKey();
  if (!openaiApiKey) {
    console.error(
      "Missing OpenAI API key. Set OPENAI_API_KEY (preferred) or openai_api_key in your env.",
    );
    return;
  }

  const batchSizeRaw = process.env.OPENAI_BATCH_SIZE ?? "100";
  const batchSize = Math.max(
    1,
    Math.min(100, parseInt(batchSizeRaw, 10) || 10),
  );

  console.log(
    `Starting trivia question generation (${iterations} iterations) using OpenAI Batch API (batch size: ${batchSize})...`,
  );

  const seenFingerprints = new Set<string>();
  const maxAttemptsPerQuestion = 5;

  let successCount = 0;
  let failureCount = 0;

  for (let offset = 0; offset < iterations; offset += batchSize) {
    const targetCount = Math.min(batchSize, iterations - offset);
    console.log(
      `\n[${offset + 1}-${offset + targetCount}/${iterations}] Generating trivia questions...`,
    );

    let remaining = targetCount;
    let savedThisChunk = 0;

    for (
      let attempt = 1;
      attempt <= maxAttemptsPerQuestion && remaining > 0;
      attempt++
    ) {
      const requestMetas: BatchRequestMeta[] = [];
      for (let i = 0; i < remaining; i++) {
        const { path, item } = getRandomLeafCategory();
        requestMetas.push({
          customId: crypto.randomUUID(),
          categoryPath: path,
          categoryItem: item,
          attempt,
        });
      }

      console.log(
        `Submitting batch for ${remaining} questions (attempt ${attempt}/${maxAttemptsPerQuestion})...`,
      );

      const batchResult = await submitBatchAndWaitForOutput(
        openaiApiKey,
        requestMetas,
      );
      if (!batchResult?.outputJsonl) {
        console.log("✗ Batch produced no output; retrying...");
        continue;
      }

      const metaById = new Map(
        requestMetas.map((m) => [m.customId, m] as const),
      );
      const lines = batchResult.outputJsonl
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean);

      let savedThisAttempt = 0;

      for (const line of lines) {
        let parsed: any;
        try {
          parsed = JSON.parse(line);
        } catch {
          continue;
        }

        const customId = parsed?.custom_id as string | undefined;
        const meta = customId ? metaById.get(customId) : undefined;
        if (!meta) continue;

        if (parsed?.error) {
          console.error(`Batch item error (${customId}):`, parsed.error);
          continue;
        }

        const statusCode = parsed?.response?.status_code as number | undefined;
        const body = parsed?.response?.body;
        if (statusCode !== 200 || !body) {
          console.error(`Batch item non-200 (${customId}): ${statusCode}`);
          continue;
        }

        const content = body?.choices?.[0]?.message?.content;
        if (typeof content !== "string") continue;

        let triviaData: any;
        try {
          triviaData = JSON.parse(extractJsonFromModelContent(content));
        } catch {
          continue;
        }

        triviaData.commonKnowledgeUserDateRange = normalizeBirthYearRange(
          triviaData.commonKnowledgeUserDateRange,
        );

        if (!isValidTriviaData(triviaData)) continue;

        const correctAnswer =
          triviaData.choices[triviaData.correctAnswerIndex] ?? "";
        const fingerprint = triviaFingerprint(
          triviaData.question,
          correctAnswer,
        );

        if (seenFingerprints.has(fingerprint)) continue;
        if (await questionExistsInDb(triviaData.question)) continue;

        const saved = await saveTriviaQuestion(meta.categoryPath, triviaData);
        if (!saved) continue;

        seenFingerprints.add(fingerprint);
        savedThisAttempt++;
        console.log(`✓ Saved: ${triviaData.question}`);
      }

      savedThisChunk += savedThisAttempt;
      remaining = targetCount - savedThisChunk;

      if (remaining > 0) {
        console.log(
          `↻ Need ${remaining} more unique questions for this chunk; retrying...`,
        );
      }
    }

    successCount += savedThisChunk;
    const failedThisChunk = targetCount - savedThisChunk;
    failureCount += failedThisChunk;

    if (failedThisChunk > 0) {
      console.log(
        `✗ Failed to generate ${failedThisChunk} questions in this chunk`,
      );
    }
  }

  console.log("\n" + "=".repeat(50));
  console.log("Trivia generation complete!");
  console.log(`Successfully generated: ${successCount}`);
  console.log(`Failed: ${failureCount}`);
  console.log("=".repeat(50));
}

/**
 * Main execution
 */
async function main() {
  try {
    // Get number of iterations from command line or default to 100
    const iterations = parseInt(process.argv[2] || "100", 10);

    if (isNaN(iterations) || iterations < 1) {
      console.error("Invalid number of iterations. Using default: 100");
      await generateTriviaQuestions(100);
    } else {
      await generateTriviaQuestions(iterations);
    }
  } catch (error) {
    console.error("Fatal error:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script when executed directly
main();

export { generateTriviaQuestions, generateTriviaQuestion, saveTriviaQuestion };
