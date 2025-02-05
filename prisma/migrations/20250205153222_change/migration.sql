/*
  Warnings:

  - You are about to drop the column `userName` on the `Character` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Character_userName_idx";

-- AlterTable
ALTER TABLE "Character" DROP COLUMN "userName",
ADD COLUMN     "name" TEXT;

-- CreateIndex
CREATE INDEX "Character_name_idx" ON "Character"("name");
