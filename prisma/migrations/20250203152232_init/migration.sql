/*
  Warnings:

  - You are about to drop the column `name` on the `TestPost` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "TestPost_name_idx";

-- AlterTable
ALTER TABLE "TestPost" DROP COLUMN "name";

-- CreateIndex
CREATE INDEX "TestPost_text_idx" ON "TestPost"("text");
