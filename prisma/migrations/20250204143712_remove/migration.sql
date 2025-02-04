/*
  Warnings:

  - You are about to drop the `TestPost` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TestPost" DROP CONSTRAINT "TestPost_createdById_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userId" TEXT NOT NULL DEFAULT 'cm6p3n2az0002b1pw67y1wvua';

-- DropTable
DROP TABLE "TestPost";

-- CreateTable
CREATE TABLE "UserInfos" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT NOT NULL DEFAULT 'cm6p3n2az0002b1pw67y1wvua',
    "userName" TEXT,
    "age" INTEGER,
    "job" TEXT,
    "city" TEXT,
    "eyeColor" TEXT,
    "presentation" TEXT,

    CONSTRAINT "UserInfos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserInfos_userName_idx" ON "UserInfos"("userName");

-- AddForeignKey
ALTER TABLE "UserInfos" ADD CONSTRAINT "UserInfos_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
