/*
  Warnings:

  - The primary key for the `Article` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Seller` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "SellingProduct" DROP CONSTRAINT "SellingProduct_article_id_fkey";

-- DropForeignKey
ALTER TABLE "SellingProduct" DROP CONSTRAINT "SellingProduct_seller_id_fkey";

-- AlterTable
ALTER TABLE "Article" DROP CONSTRAINT "Article_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Article_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Article_id_seq";

-- AlterTable
ALTER TABLE "Seller" DROP CONSTRAINT "Seller_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Seller_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Seller_id_seq";

-- AlterTable
ALTER TABLE "SellingProduct" ALTER COLUMN "seller_id" SET DATA TYPE TEXT,
ALTER COLUMN "article_id" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "SellingProduct" ADD CONSTRAINT "SellingProduct_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "Seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SellingProduct" ADD CONSTRAINT "SellingProduct_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "Article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
