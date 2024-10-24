-- AddForeignKey
ALTER TABLE `CartItem` ADD CONSTRAINT `CartItem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `AddProduct`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
