/*
  Warnings:

  - You are about to drop the column `employeeCin` on the `Conge` table. All the data in the column will be lost.
  - You are about to drop the `DemandeConge` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `approvedAt` to the `Conge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `approvedById` to the `Conge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employeeId` to the `Conge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reason` to the `Conge` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Conge" DROP CONSTRAINT "Conge_id_fkey";

-- DropForeignKey
ALTER TABLE "DemandeConge" DROP CONSTRAINT "DemandeConge_approvedById_fkey";

-- DropForeignKey
ALTER TABLE "DemandeConge" DROP CONSTRAINT "DemandeConge_userId_fkey";

-- AlterTable
ALTER TABLE "Conge" DROP COLUMN "employeeCin",
ADD COLUMN     "approvedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "approvedById" INTEGER NOT NULL,
ADD COLUMN     "employeeId" INTEGER NOT NULL,
ADD COLUMN     "reason" TEXT NOT NULL,
ADD COLUMN     "requestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'En attente';

-- DropTable
DROP TABLE "DemandeConge";

-- AddForeignKey
ALTER TABLE "Conge" ADD CONSTRAINT "Conge_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conge" ADD CONSTRAINT "Conge_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
