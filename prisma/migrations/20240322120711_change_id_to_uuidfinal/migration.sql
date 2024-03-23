/*
  Warnings:

  - The primary key for the `Article` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Article` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `SellingProduct` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `SellingProduct` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `article_id` on the `SellingProduct` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "SellingProduct" DROP CONSTRAINT "SellingProduct_article_id_fkey";

-- AlterTable
ALTER TABLE "Article" DROP CONSTRAINT "Article_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Article_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "SellingProduct" DROP CONSTRAINT "SellingProduct_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "article_id",
ADD COLUMN     "article_id" INTEGER NOT NULL,
ADD CONSTRAINT "SellingProduct_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "SellingProduct" ADD CONSTRAINT "SellingProduct_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "Article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
