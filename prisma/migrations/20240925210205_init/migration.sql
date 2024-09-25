/*
  Warnings:

  - The primary key for the `Employee` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `identification_number` on the `Employee` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cin]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cin` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Conge" DROP CONSTRAINT "Conge_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "DemandeConge" DROP CONSTRAINT "DemandeConge_approvedById_fkey";

-- DropForeignKey
ALTER TABLE "DemandeConge" DROP CONSTRAINT "DemandeConge_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_manager_id_fkey";

-- DropIndex
DROP INDEX "Employee_identification_number_key";

-- AlterTable
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_pkey",
DROP COLUMN "id",
DROP COLUMN "identification_number",
ADD COLUMN     "cin" INTEGER NOT NULL,
ALTER COLUMN "gender" SET DEFAULT 'Homme';

-- CreateIndex
CREATE UNIQUE INDEX "Employee_cin_key" ON "Employee"("cin");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "Employee"("cin") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conge" ADD CONSTRAINT "Conge_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("cin") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DemandeConge" ADD CONSTRAINT "DemandeConge_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("cin") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DemandeConge" ADD CONSTRAINT "DemandeConge_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "Employee"("cin") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("cin") ON DELETE RESTRICT ON UPDATE CASCADE;
