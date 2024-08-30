-- AlterTable
ALTER TABLE "Visitor" ADD COLUMN     "resetPasswordExpires" BIGINT,
ADD COLUMN     "resetPasswordToken" TEXT;
