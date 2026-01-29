import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";

// GET /api/games - List all games for the authenticated user
export async function GET() {
  try {
    const user = await isAuthenticated();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const games = await prisma.game.findMany({
      where: {
        clerkUserId: user.id,
      },
      include: {
        questions: {
          orderBy: {
            orderIndex: "asc",
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return NextResponse.json({ games });
  } catch (error) {
    console.error("Error fetching games:", error);
    return NextResponse.json(
      { error: "Failed to fetch games" },
      { status: 500 },
    );
  }
}

// POST /api/games - Create a new game
export async function POST(request: Request) {
  try {
    const user = await isAuthenticated();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, questions } = body;

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { error: "Game name is required" },
        { status: 400 },
      );
    }

    if (!Array.isArray(questions) || questions.length === 0) {
      return NextResponse.json(
        { error: "At least one question is required" },
        { status: 400 },
      );
    }

    if (questions.length > 50) {
      return NextResponse.json(
        { error: "Maximum 50 questions allowed" },
        { status: 400 },
      );
    }

    // Validate each question
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.question || !q.answer1 || !q.answer2) {
        return NextResponse.json(
          { error: `Question ${i + 1} is missing required fields` },
          { status: 400 },
        );
      }
      if (!q.correctAnswer || q.correctAnswer < 1 || q.correctAnswer > 4) {
        return NextResponse.json(
          { error: `Question ${i + 1} has invalid correct answer` },
          { status: 400 },
        );
      }
    }

    const game = await prisma.game.create({
      data: {
        clerkUserId: user.id,
        name: name.trim(),
        questions: {
          create: questions.map((q: any, index: number) => ({
            question: q.question,
            answer1: q.answer1,
            answer2: q.answer2,
            answer3: q.answer3 || null,
            answer4: q.answer4 || null,
            correctAnswer: q.correctAnswer,
            orderIndex: index,
          })),
        },
      },
      include: {
        questions: {
          orderBy: {
            orderIndex: "asc",
          },
        },
      },
    });

    return NextResponse.json({ game });
  } catch (error) {
    console.error("Error creating game:", error);
    return NextResponse.json(
      { error: "Failed to create game" },
      { status: 500 },
    );
  }
}

// PUT /api/games - Update an existing game
export async function PUT(request: Request) {
  try {
    const user = await isAuthenticated();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { id, name, questions } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Game ID is required" },
        { status: 400 },
      );
    }

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { error: "Game name is required" },
        { status: 400 },
      );
    }

    if (!Array.isArray(questions) || questions.length === 0) {
      return NextResponse.json(
        { error: "At least one question is required" },
        { status: 400 },
      );
    }

    if (questions.length > 50) {
      return NextResponse.json(
        { error: "Maximum 50 questions allowed" },
        { status: 400 },
      );
    }

    // Validate each question
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.question || !q.answer1 || !q.answer2) {
        return NextResponse.json(
          { error: `Question ${i + 1} is missing required fields` },
          { status: 400 },
        );
      }
      if (!q.correctAnswer || q.correctAnswer < 1 || q.correctAnswer > 4) {
        return NextResponse.json(
          { error: `Question ${i + 1} has invalid correct answer` },
          { status: 400 },
        );
      }
    }

    // Verify game belongs to user
    const existingGame = await prisma.game.findFirst({
      where: {
        id,
        clerkUserId: user.id,
      },
    });

    if (!existingGame) {
      return NextResponse.json(
        { error: "Game not found or unauthorized" },
        { status: 404 },
      );
    }

    // Delete existing questions and create new ones
    await prisma.gameQuestion.deleteMany({
      where: {
        gameId: id,
      },
    });

    const game = await prisma.game.update({
      where: {
        id,
      },
      data: {
        name: name.trim(),
        questions: {
          create: questions.map((q: any, index: number) => ({
            question: q.question,
            answer1: q.answer1,
            answer2: q.answer2,
            answer3: q.answer3 || null,
            answer4: q.answer4 || null,
            correctAnswer: q.correctAnswer,
            orderIndex: index,
          })),
        },
      },
      include: {
        questions: {
          orderBy: {
            orderIndex: "asc",
          },
        },
      },
    });

    return NextResponse.json({ game });
  } catch (error) {
    console.error("Error updating game:", error);
    return NextResponse.json(
      { error: "Failed to update game" },
      { status: 500 },
    );
  }
}

// DELETE /api/games - Delete a game
export async function DELETE(request: Request) {
  try {
    const user = await isAuthenticated();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const gameId = searchParams.get("id");

    if (!gameId) {
      return NextResponse.json(
        { error: "Game ID is required" },
        { status: 400 },
      );
    }

    // Verify game belongs to user
    const existingGame = await prisma.game.findFirst({
      where: {
        id: gameId,
        clerkUserId: user.id,
      },
    });

    if (!existingGame) {
      return NextResponse.json(
        { error: "Game not found or unauthorized" },
        { status: 404 },
      );
    }

    await prisma.game.delete({
      where: {
        id: gameId,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error deleting game:", error);
    return NextResponse.json(
      { error: "Failed to delete game" },
      { status: 500 },
    );
  }
}
