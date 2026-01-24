/*
  Warnings:

  - The `commonKnowledgeUserDateRange` column on the `TriviaQuestion` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "TriviaQuestion" DROP COLUMN "commonKnowledgeUserDateRange",
ADD COLUMN     "commonKnowledgeUserDateRange" JSONB;
