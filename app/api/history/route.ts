import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

type SortOption = "newest" | "oldest" | "correct" | "incorrect";

function getTopLevelCategory(
  categoryPath: string | null,
  category: string,
): string {
  const raw =
    typeof categoryPath === "string" && categoryPath.trim().length > 0
      ? categoryPath
      : category;
  const delimiter = raw.includes(" > ")
    ? " > "
    : raw.includes(">")
      ? ">"
      : raw.includes("/")
        ? "/"
        : null;

  if (!delimiter) return raw.trim();
  return (
    raw
      .split(delimiter)
      .map((s) => s.trim())
      .filter(Boolean)[0] ?? raw.trim()
  );
}

function isSortOption(value: string | null): value is SortOption {
  return (
    value === "newest" ||
    value === "oldest" ||
    value === "correct" ||
    value === "incorrect"
  );
}

export async function GET(request: Request) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const search = searchParams.get("search") || "";
    const topCategory = searchParams.get("topCategory") || "";
    const sortParam = searchParams.get("sort");
    const sort: SortOption = isSortOption(sortParam) ? sortParam : "newest";

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

    const enrichedSearchFiltered = allHistory
      .map((h) => {
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
          _topLevelCategory: getTopLevelCategory(
            question.categoryPath,
            question.category,
          ),
        };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null);

    const availableTopLevelCategories = Array.from(
      new Set(
        enrichedSearchFiltered.map((i) => i._topLevelCategory).filter(Boolean),
      ),
    ).sort((a, b) => a.localeCompare(b));

    const filtered = topCategory
      ? enrichedSearchFiltered.filter(
          (i) => i._topLevelCategory === topCategory,
        )
      : enrichedSearchFiltered;

    const sorted = [...filtered].sort((a, b) => {
      switch (sort) {
        case "oldest":
          return (
            new Date(a.answeredAt).getTime() - new Date(b.answeredAt).getTime()
          );
        case "correct":
          if (a.isCorrect !== b.isCorrect) return a.isCorrect ? -1 : 1;
          return (
            new Date(b.answeredAt).getTime() - new Date(a.answeredAt).getTime()
          );
        case "incorrect":
          if (a.isCorrect !== b.isCorrect) return a.isCorrect ? 1 : -1;
          return (
            new Date(b.answeredAt).getTime() - new Date(a.answeredAt).getTime()
          );
        case "newest":
        default:
          return (
            new Date(b.answeredAt).getTime() - new Date(a.answeredAt).getTime()
          );
      }
    });

    const totalCount = sorted.length;
    const paginated = sorted.slice(skip, skip + limit);

    const items = paginated.map(({ _topLevelCategory, ...rest }) => rest);

    return NextResponse.json({
      items,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
      topLevelCategories: availableTopLevelCategories,
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
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
