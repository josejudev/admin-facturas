/*
  Warnings:

  - You are about to alter the column `email` on the `client` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(50)`.

*/
-- AlterTable
ALTER TABLE `client` MODIFY `email` VARCHAR(50) NOT NULL;
