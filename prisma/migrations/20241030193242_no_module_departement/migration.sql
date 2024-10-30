/*
  Warnings:

  - You are about to drop the column `department_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Department` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_department_id_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "department_id",
ADD COLUMN     "department" TEXT;

-- DropTable
DROP TABLE "Department";
