-- CreateTable
CREATE TABLE "QuestionHistory" (
    "id" TEXT NOT NULL,
    "clerkUserId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "choiceKey" INTEGER NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    "answeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuestionHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPreferences" (
    "id" TEXT NOT NULL,
    "clerkUserId" TEXT NOT NULL,
    "skipRepeats" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserPreferences_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "QuestionHistory_clerkUserId_idx" ON "QuestionHistory"("clerkUserId");

-- CreateIndex
CREATE INDEX "QuestionHistory_questionId_idx" ON "QuestionHistory"("questionId");

-- CreateIndex
CREATE INDEX "QuestionHistory_clerkUserId_questionId_idx" ON "QuestionHistory"("clerkUserId", "questionId");

-- CreateIndex
CREATE UNIQUE INDEX "UserPreferences_clerkUserId_key" ON "UserPreferences"("clerkUserId");

-- CreateIndex
CREATE INDEX "UserPreferences_clerkUserId_idx" ON "UserPreferences"("clerkUserId");
