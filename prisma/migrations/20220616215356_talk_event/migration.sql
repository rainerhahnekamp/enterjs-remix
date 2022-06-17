/*
  Warnings:

  - Added the required column `event` to the `Talk` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Talk" ADD COLUMN     "event" TEXT NOT NULL;
