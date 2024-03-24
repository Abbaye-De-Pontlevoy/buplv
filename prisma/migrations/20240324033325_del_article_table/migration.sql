/*
  Warnings:

  - The primary key for the `SellingProduct` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `article_id` on the `SellingProduct` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `SellingProduct` table. All the data in the column will be lost.
  - The `id` column on the `SellingProduct` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Article` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `bic` to the `Seller` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code_pays` to the `Seller` table without a default value. This is not possible if the table is not empty.
  - Added the required column `iban` to the `Seller` table without a default value. This is not possible if the table is not empty.
  - Added the required column `brand` to the `SellingProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `SellingProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `SellingProduct` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SellingProduct" DROP CONSTRAINT "SellingProduct_article_id_fkey";

-- AlterTable
ALTER TABLE "Seller" ADD COLUMN     "bic" TEXT NOT NULL,
ADD COLUMN     "code_pays" TEXT NOT NULL,
ADD COLUMN     "iban" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SellingProduct" DROP CONSTRAINT "SellingProduct_pkey",
DROP COLUMN "article_id",
DROP COLUMN "quantity",
ADD COLUMN     "brand" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "size" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "SellingProduct_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "Article";
