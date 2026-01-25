import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Body = {
  questionId?: string;
  choiceKey?: number;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Body;
    const questionId = body.questionId?.trim();
    const choiceKey = body.choiceKey;

    if (!questionId) {
      return NextResponse.json(
        { error: "Missing questionId" },
        { status: 400 },
      );
    }

    if (![1, 2, 3, 4].includes(choiceKey ?? -1)) {
      return NextResponse.json(
        { error: "choiceKey must be 1-4" },
        { status: 400 },
      );
    }

    const choiceCountField =
      choiceKey === 1
        ? "choice1Count"
        : choiceKey === 2
          ? "choice2Count"
          : choiceKey === 3
            ? "choice3Count"
            : "choice4Count";

    await prisma.triviaQuestion.update({
      where: { id: questionId },
      data: {
        engagement: { increment: 1 },
        [choiceCountField]: { increment: 1 },
      },
      select: { id: true },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error recording trivia answer:", error);
    return NextResponse.json(
      { error: "Failed to record answer" },
      { status: 500 },
    );
  }
}
