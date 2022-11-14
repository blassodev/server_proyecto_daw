/*
  Warnings:

  - Added the required column `imageUrl` to the `RentedBook` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `RentedMovie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RentedBook" ADD COLUMN     "imageUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "RentedMovie" ADD COLUMN     "imageUrl" TEXT NOT NULL;
