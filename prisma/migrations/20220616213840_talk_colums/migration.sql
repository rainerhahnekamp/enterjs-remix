/*
  Warnings:

  - Added the required column `date` to the `Talk` table without a default value. This is not possible if the table is not empty.
  - Added the required column `language` to the `Talk` table without a default value. This is not possible if the table is not empty.

*/
-- Delete Table
DELETE FROM "Talk";

-- AlterTable
ALTER TABLE "Talk" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "language" TEXT NOT NULL;
