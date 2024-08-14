/*
  Warnings:

  - You are about to drop the column `managerId` on the `Department` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[departmentId]` on the table `Manager` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `departmentId` to the `Manager` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Department" DROP CONSTRAINT "Department_managerId_fkey";

-- DropIndex
DROP INDEX "Department_managerId_key";

-- AlterTable
ALTER TABLE "Department" DROP COLUMN "managerId";

-- AlterTable
ALTER TABLE "Manager" ADD COLUMN     "departmentId" INTEGER NOT NULL,
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Manager_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Manager_departmentId_key" ON "Manager"("departmentId");

-- AddForeignKey
ALTER TABLE "Manager" ADD CONSTRAINT "Manager_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
