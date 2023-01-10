-- DropForeignKey
ALTER TABLE `offer` DROP FOREIGN KEY `offer_client_id_fkey`;

-- AddForeignKey
ALTER TABLE `offer` ADD CONSTRAINT `offer_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `client`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
