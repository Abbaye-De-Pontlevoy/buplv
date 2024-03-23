/*
  Warnings:

  - You are about to drop the column `class` on the `Seller` table. All the data in the column will be lost.
  - Added the required column `grade` to the `Seller` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Seller" DROP COLUMN "class",
ADD COLUMN     "grade" TEXT NOT NULL;
