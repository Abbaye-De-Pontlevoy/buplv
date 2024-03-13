/*
  Warnings:

  - You are about to drop the column `adress` on the `Seller` table. All the data in the column will be lost.
  - You are about to drop the column `telephone` on the `Seller` table. All the data in the column will be lost.
  - Added the required column `address` to the `Seller` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Seller` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Seller" DROP COLUMN "adress",
DROP COLUMN "telephone",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL;
