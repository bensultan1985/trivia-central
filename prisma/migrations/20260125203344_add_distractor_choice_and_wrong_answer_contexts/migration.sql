-- AlterTable
ALTER TABLE "TriviaQuestion" ADD COLUMN     "distractorChoice" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "wrongAnswer1Context" TEXT,
ADD COLUMN     "wrongAnswer2Context" TEXT,
ADD COLUMN     "wrongAnswer3Context" TEXT;
