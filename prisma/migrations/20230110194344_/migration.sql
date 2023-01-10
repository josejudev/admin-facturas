/*
  Warnings:

  - Added the required column `offer_id` to the `client` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `offer` DROP FOREIGN KEY `offer_client_id_fkey`;

-- AlterTable
ALTER TABLE `client` ADD COLUMN `offer_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `client` ADD CONSTRAINT `client_offer_id_fkey` FOREIGN KEY (`offer_id`) REFERENCES `offer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
