/*
  Warnings:

  - The primary key for the `Conge` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Conge" DROP CONSTRAINT "Conge_pkey",
ADD CONSTRAINT "Conge_pkey" PRIMARY KEY ("employeeCin");
