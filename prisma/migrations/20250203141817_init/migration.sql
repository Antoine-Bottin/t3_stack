-- CreateTable
CREATE TABLE "TestPost" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT NOT NULL,
    "test" TEXT NOT NULL,

    CONSTRAINT "TestPost_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TestPost_name_idx" ON "TestPost"("name");

-- AddForeignKey
ALTER TABLE "TestPost" ADD CONSTRAINT "TestPost_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
