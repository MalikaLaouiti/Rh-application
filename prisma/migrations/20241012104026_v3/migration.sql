/*
  Warnings:

  - Made the column `approvedAt` on table `DemandeConge` required. This step will fail if there are existing NULL values in that column.
  - Made the column `approvedById` on table `DemandeConge` required. This step will fail if there are existing NULL values in that column.
  - Made the column `reason` on table `DemandeConge` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "DemandeConge" DROP CONSTRAINT "DemandeConge_approvedById_fkey";

-- AlterTable
ALTER TABLE "DemandeConge" ALTER COLUMN "approvedAt" SET NOT NULL,
ALTER COLUMN "approvedById" SET NOT NULL,
ALTER COLUMN "reason" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "DemandeConge" ADD CONSTRAINT "DemandeConge_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
