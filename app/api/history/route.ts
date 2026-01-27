import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function GET(request: Request) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 },
      );
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const search = searchParams.get("search") || "";

    const skip = (page - 1) * limit;

    // First, get all history for the user
    const allHistory = await prisma.questionHistory.findMany({
      where: {
        clerkUserId: user.id,
      },
      orderBy: {
        answeredAt: "desc" as const,
      },
    });

    // Get all question IDs
    const questionIds = allHistory.map((h) => h.questionId);

    // Build search filter for questions
    let questionWhere: any = {
      id: { in: questionIds },
    };

    if (search) {
      const searchFilter = {
        OR: [
          { question: { contains: search, mode: "insensitive" as const } },
          { category: { contains: search, mode: "insensitive" as const } },
          { correctAnswer: { contains: search, mode: "insensitive" as const } },
        ],
      };
      questionWhere = { ...questionWhere, ...searchFilter };
    }

    // Get questions that match the search criteria
    const questions = await prisma.triviaQuestion.findMany({
      where: questionWhere,
    });

    const questionMap = new Map(questions.map((q) => [q.id, q]));

    // Filter history to only include items with matching questions
    const filteredHistory = allHistory.filter((h) => questionMap.has(h.questionId));

    // Apply pagination to filtered results
    const paginatedHistory = filteredHistory.slice(skip, skip + limit);

    // Combine history with question details
    const items = paginatedHistory.map((h) => {
      const question = questionMap.get(h.questionId);
      if (!question) return null;

      return {
        id: h.id,
        questionId: h.questionId,
        question: question.question,
        correctAnswer: question.correctAnswer,
        wrongAnswer1: question.wrongAnswer1,
        wrongAnswer2: question.wrongAnswer2,
        wrongAnswer3: question.wrongAnswer3,
        distractorChoice: question.distractorChoice,
        wrongAnswer1Context: question.wrongAnswer1Context,
        wrongAnswer2Context: question.wrongAnswer2Context,
        wrongAnswer3Context: question.wrongAnswer3Context,
        questionContext: question.questionContext,
        answerContext: question.answerContext,
        category: question.category,
        categoryPath: question.categoryPath,
        difficulty: question.difficulty,
        choiceKey: h.choiceKey,
        isCorrect: h.isCorrect,
        answeredAt: h.answeredAt,
      };
    }).filter((item): item is NonNullable<typeof item> => item !== null);

    const totalCount = filteredHistory.length;

    return NextResponse.json({
      items,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching history:", error);
    return NextResponse.json(
      { error: "Failed to fetch history" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 },
      );
    }

    const { searchParams } = new URL(request.url);
    const historyId = searchParams.get("id");

    if (historyId) {
      // Delete single history entry
      await prisma.questionHistory.delete({
        where: {
          id: historyId,
          clerkUserId: user.id, // Ensure user can only delete their own history
        },
      });
    } else {
      // Delete all history for user
      await prisma.questionHistory.deleteMany({
        where: {
          clerkUserId: user.id,
        },
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error deleting history:", error);
    return NextResponse.json(
      { error: "Failed to delete history" },
      { status: 500 },
    );
  }
}
