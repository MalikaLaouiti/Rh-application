/*
  Warnings:

  - You are about to drop the column `userId` on the `Account` table. All the data in the column will be lost.
  - The primary key for the `Conge` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Session` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `manager_id` on the `User` table. All the data in the column will be lost.
  - Added the required column `user_cin` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_cin` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_cin` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_userId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_manager_id_fkey";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "userId",
ADD COLUMN     "user_cin" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Conge" DROP CONSTRAINT "Conge_pkey",
ADD CONSTRAINT "Conge_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Document" DROP COLUMN "userId",
ADD COLUMN     "user_cin" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "userId",
ADD COLUMN     "user_cin" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
DROP COLUMN "manager_id",
ADD COLUMN     "manager_cin" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_manager_cin_fkey" FOREIGN KEY ("manager_cin") REFERENCES "User"("cin") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_user_cin_fkey" FOREIGN KEY ("user_cin") REFERENCES "User"("cin") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_user_cin_fkey" FOREIGN KEY ("user_cin") REFERENCES "User"("cin") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_user_cin_fkey" FOREIGN KEY ("user_cin") REFERENCES "User"("cin") ON DELETE RESTRICT ON UPDATE CASCADE;
