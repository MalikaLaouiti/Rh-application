/*
  Warnings:

  - You are about to drop the column `user_cin` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `user_cin` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `user_cin` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `manager_cin` on the `User` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_user_cin_fkey";

-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_user_cin_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_user_cin_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_manager_cin_fkey";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "user_cin",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Document" DROP COLUMN "user_cin",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "user_cin",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "manager_cin",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "manager_id" INTEGER,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
