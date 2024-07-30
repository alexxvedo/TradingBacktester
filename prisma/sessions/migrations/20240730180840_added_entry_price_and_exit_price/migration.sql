/*
  Warnings:

  - Added the required column `entryDate` to the `operation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `operation` ADD COLUMN `entryDate` DATETIME(3) NOT NULL,
    ADD COLUMN `exitDate` DATETIME(3) NULL;
