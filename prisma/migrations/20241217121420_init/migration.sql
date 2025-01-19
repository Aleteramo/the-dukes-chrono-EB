/*
  Warnings:

  - You are about to alter the column `type` on the `Content` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(5))`.
  - You are about to alter the column `type` on the `ContentHistory` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(5))`.
  - You are about to drop the `AdminUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX `Watch_brand_idx` ON `Watch`;

-- DropIndex
DROP INDEX `Watch_model_idx` ON `Watch`;

-- AlterTable
ALTER TABLE `Content` MODIFY `type` ENUM('TEXT', 'IMAGE', 'HTML', 'JSON') NOT NULL;

-- AlterTable
ALTER TABLE `ContentHistory` MODIFY `type` ENUM('TEXT', 'IMAGE', 'HTML', 'JSON') NOT NULL;

-- DropTable
DROP TABLE `AdminUser`;

-- CreateIndex
CREATE INDEX `Category_slug_idx` ON `Category`(`slug`);

-- CreateIndex
CREATE INDEX `Content_contentKey_idx` ON `Content`(`contentKey`);

-- CreateIndex
CREATE INDEX `Inquiry_watchId_status_idx` ON `Inquiry`(`watchId`, `status`);

-- CreateIndex
CREATE INDEX `Inquiry_email_idx` ON `Inquiry`(`email`);

-- CreateIndex
CREATE INDEX `User_email_idx` ON `User`(`email`);

-- CreateIndex
CREATE INDEX `User_username_idx` ON `User`(`username`);

-- CreateIndex
CREATE INDEX `Watch_brand_model_idx` ON `Watch`(`brand`, `model`);

-- CreateIndex
CREATE INDEX `Watch_status_isAvailable_idx` ON `Watch`(`status`, `isAvailable`);

-- CreateIndex
CREATE INDEX `Watch_slug_idx` ON `Watch`(`slug`);

-- RenameIndex
ALTER TABLE `WatchImage` RENAME INDEX `WatchImage_watchId_fkey` TO `WatchImage_watchId_idx`;
