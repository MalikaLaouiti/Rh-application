/*
  Warnings:

  - You are about to drop the column `employeeId` on the `Conge` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Conge` table. All the data in the column will be lost.
  - Added the required column `employeeCin` to the `Conge` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Conge" DROP CONSTRAINT "Conge_approvedById_fkey";

-- DropForeignKey
ALTER TABLE "Conge" DROP CONSTRAINT "Conge_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "Conge" DROP CONSTRAINT "Conge_userId_fkey";

-- AlterTable
ALTER TABLE "Conge" DROP COLUMN "employeeId",
DROP COLUMN "userId",
ADD COLUMN     "employeeCin" INTEGER NOT NULL,
ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL,
ALTER COLUMN "approvedAt" DROP NOT NULL,
ALTER COLUMN "approvedById" DROP NOT NULL,
ALTER COLUMN "requestedAt" DROP NOT NULL,
ALTER COLUMN "status" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Conge" ADD CONSTRAINT "Conge_employeeCin_fkey" FOREIGN KEY ("employeeCin") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conge" ADD CONSTRAINT "Conge_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
