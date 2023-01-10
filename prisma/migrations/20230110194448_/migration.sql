/*
  Warnings:

  - You are about to drop the column `offer_id` on the `client` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `client` DROP FOREIGN KEY `client_offer_id_fkey`;

-- DropIndex
DROP INDEX `offer_client_id_fkey` ON `offer`;

-- AlterTable
ALTER TABLE `client` DROP COLUMN `offer_id`;

-- AddForeignKey
ALTER TABLE `offer` ADD CONSTRAINT `offer_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
