/*
  Warnings:

  - The primary key for the `SellingProduct` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "SellingProduct" DROP CONSTRAINT "SellingProduct_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "SellingProduct_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "SellingProduct_id_seq";
