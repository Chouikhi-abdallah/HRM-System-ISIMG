/*
  Warnings:

  - You are about to drop the `_HRAdminToPayroll` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_HRAdminToVacation` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `hrAdminId` to the `Payroll` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hrAdminId` to the `Vacation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_HRAdminToPayroll" DROP CONSTRAINT "_HRAdminToPayroll_A_fkey";

-- DropForeignKey
ALTER TABLE "_HRAdminToPayroll" DROP CONSTRAINT "_HRAdminToPayroll_B_fkey";

-- DropForeignKey
ALTER TABLE "_HRAdminToVacation" DROP CONSTRAINT "_HRAdminToVacation_A_fkey";

-- DropForeignKey
ALTER TABLE "_HRAdminToVacation" DROP CONSTRAINT "_HRAdminToVacation_B_fkey";

-- AlterTable
ALTER TABLE "Payroll" ADD COLUMN     "hrAdminId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Vacation" ADD COLUMN     "hrAdminId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_HRAdminToPayroll";

-- DropTable
DROP TABLE "_HRAdminToVacation";

-- AddForeignKey
ALTER TABLE "Payroll" ADD CONSTRAINT "Payroll_hrAdminId_fkey" FOREIGN KEY ("hrAdminId") REFERENCES "HRAdmin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vacation" ADD CONSTRAINT "Vacation_hrAdminId_fkey" FOREIGN KEY ("hrAdminId") REFERENCES "HRAdmin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
