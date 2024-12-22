-- DropForeignKey
ALTER TABLE "Conge" DROP CONSTRAINT "Conge_approvedById_fkey";

-- DropForeignKey
ALTER TABLE "Conge" DROP CONSTRAINT "Conge_employeeCin_fkey";

-- AlterTable
ALTER TABLE "Conge" ALTER COLUMN "approvedById" SET DATA TYPE TEXT,
ALTER COLUMN "employeeCin" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Conge" ADD CONSTRAINT "Conge_employeeCin_fkey" FOREIGN KEY ("employeeCin") REFERENCES "User"("cin") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conge" ADD CONSTRAINT "Conge_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "User"("cin") ON DELETE SET NULL ON UPDATE CASCADE;
