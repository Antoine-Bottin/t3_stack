/*
  Warnings:

  - You are about to drop the `UserInfos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserInfos" DROP CONSTRAINT "UserInfos_createdById_fkey";

-- DropTable
DROP TABLE "UserInfos";

-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT NOT NULL DEFAULT 'cm6p3n2az0002b1pw67y1wvua',
    "userName" TEXT,
    "age" INTEGER NOT NULL,
    "size" INTEGER NOT NULL,
    "job" TEXT,
    "city" TEXT,
    "eyeColor" TEXT,
    "presentation" TEXT,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Character_userName_idx" ON "Character"("userName");

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
