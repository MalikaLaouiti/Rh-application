/*
  Warnings:

  - You are about to drop the column `employeeId` on the `Conge` table. All the data in the column will be lost.
  - Added the required column `employeeCin` to the `Conge` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Conge" DROP COLUMN "employeeId",
ADD COLUMN     "employeeCin" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "DemandeConge" ALTER COLUMN "status" SET DEFAULT 'En attente';
