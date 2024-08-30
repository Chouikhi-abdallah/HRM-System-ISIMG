/*
  Warnings:

  - Added the required column `status` to the `Vacation` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "VacationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "Vacation" ADD COLUMN     "status" "VacationStatus" NOT NULL;
