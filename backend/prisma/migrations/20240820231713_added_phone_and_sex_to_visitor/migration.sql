/*
  Warnings:

  - You are about to drop the column `status` on the `Vacation` table. All the data in the column will be lost.
  - Added the required column `phone` to the `Visitor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sex` to the `Visitor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Vacation" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "Visitor" ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "sex" TEXT NOT NULL;
