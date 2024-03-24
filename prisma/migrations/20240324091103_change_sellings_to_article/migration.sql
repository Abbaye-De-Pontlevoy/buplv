/*
  Warnings:

  - You are about to drop the column `code_pays` on the `Seller` table. All the data in the column will be lost.
  - You are about to drop the `SellingProduct` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `country_code` to the `Seller` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SellingProduct" DROP CONSTRAINT "SellingProduct_seller_id_fkey";

-- AlterTable
ALTER TABLE "Seller" DROP COLUMN "code_pays",
ADD COLUMN     "country_code" TEXT NOT NULL;

-- DropTable
DROP TABLE "SellingProduct";

-- CreateTable
CREATE TABLE "Article" (
    "id" SERIAL NOT NULL,
    "seller_id" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "state" INTEGER NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "Seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
