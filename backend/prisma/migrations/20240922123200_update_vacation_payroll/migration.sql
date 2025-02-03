/*
  Warnings:

  - You are about to drop the column `employeeId` on the `Payroll` table. All the data in the column will be lost.
  - You are about to drop the column `employeeId` on the `Vacation` table. All the data in the column will be lost.
  - Added the required column `visitorId` to the `Payroll` table without a default value. This is not possible if the table is not empty.
  - Added the required column `visitorId` to the `Vacation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Payroll" DROP CONSTRAINT "Payroll_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "Vacation" DROP CONSTRAINT "Vacation_employeeId_fkey";

-- AlterTable
ALTER TABLE "Payroll" DROP COLUMN "employeeId",
ADD COLUMN     "visitorId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Vacation" DROP COLUMN "employeeId",
ADD COLUMN     "visitorId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Payroll" ADD CONSTRAINT "Payroll_visitorId_fkey" FOREIGN KEY ("visitorId") REFERENCES "Visitor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vacation" ADD CONSTRAINT "Vacation_visitorId_fkey" FOREIGN KEY ("visitorId") REFERENCES "Visitor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
