/*
  Warnings:

  - You are about to drop the column `country_code` on the `Seller` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Seller_student_name_key";

-- AlterTable
ALTER TABLE "Seller" DROP COLUMN "country_code";
