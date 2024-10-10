/*
  Warnings:

  - A unique constraint covering the columns `[userId,productId]` on the table `NewItems` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `NewItems_userId_productId_key` ON `NewItems`(`userId`, `productId`);
