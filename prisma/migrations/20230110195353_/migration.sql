/*
  Warnings:

  - You are about to alter the column `name` on the `client` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - Added the required column `address` to the `client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contact_email` to the `client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contact_phone` to the `client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fiscal_address` to the `client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rfc` to the `client` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `client` ADD COLUMN `address` VARCHAR(100) NOT NULL,
    ADD COLUMN `contact_email` VARCHAR(50) NOT NULL,
    ADD COLUMN `contact_phone` VARCHAR(30) NOT NULL,
    ADD COLUMN `email` VARCHAR(100) NOT NULL,
    ADD COLUMN `fiscal_address` VARCHAR(100) NOT NULL,
    ADD COLUMN `rfc` CHAR(15) NOT NULL,
    MODIFY `name` VARCHAR(100) NOT NULL;
