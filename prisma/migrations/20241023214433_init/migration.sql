-- CreateTable
CREATE TABLE `Watch` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `brand` VARCHAR(100) NOT NULL,
    `model` VARCHAR(100) NOT NULL,
    `reference` VARCHAR(50) NULL,
    `year` INTEGER NULL,
    `serialNumber` VARCHAR(50) NULL,
    `movement` VARCHAR(50) NOT NULL,
    `caliber` VARCHAR(50) NULL,
    `diameter` INTEGER NULL,
    `material` VARCHAR(50) NULL,
    `caseMaterial` VARCHAR(50) NULL,
    `braceletMaterial` VARCHAR(50) NULL,
    `glassType` VARCHAR(50) NULL,
    `waterResistance` VARCHAR(50) NULL,
    `condition` ENUM('NEW', 'EXCELLENT', 'VERY_GOOD', 'GOOD', 'FAIR', 'FOR_PARTS') NOT NULL,
    `box` BOOLEAN NOT NULL DEFAULT false,
    `papers` BOOLEAN NOT NULL DEFAULT false,
    `serviceHistory` BOOLEAN NOT NULL DEFAULT false,
    `lastService` DATETIME(3) NULL,
    `videos` JSON NULL,
    `description` TEXT NOT NULL,
    `features` JSON NULL,
    `rarity` VARCHAR(100) NULL,
    `price` DECIMAL(10, 2) NULL,
    `isAvailable` BOOLEAN NOT NULL DEFAULT true,
    `soldAt` DATETIME(3) NULL,
    `reserved` BOOLEAN NOT NULL DEFAULT false,
    `slug` VARCHAR(255) NOT NULL,
    `metaTitle` VARCHAR(255) NULL,
    `metaDesc` TEXT NULL,
    `instagramUrl` VARCHAR(255) NULL,
    `instagramPostId` VARCHAR(100) NULL,
    `categoryId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Watch_slug_key`(`slug`),
    INDEX `Watch_brand_idx`(`brand`),
    INDEX `Watch_model_idx`(`model`),
    INDEX `Watch_categoryId_idx`(`categoryId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Image` (
    `id` VARCHAR(191) NOT NULL,
    `url` VARCHAR(255) NOT NULL,
    `alt` VARCHAR(255) NULL,
    `order` INTEGER NOT NULL DEFAULT 0,
    `isPrimary` BOOLEAN NOT NULL DEFAULT false,
    `watchId` VARCHAR(191) NOT NULL,

    INDEX `Image_watchId_idx`(`watchId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `slug` VARCHAR(100) NOT NULL,
    `description` TEXT NULL,

    UNIQUE INDEX `Category_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Inquiry` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `message` TEXT NOT NULL,
    `phone` VARCHAR(20) NULL,
    `status` ENUM('PENDING', 'RESPONDED', 'CLOSED') NOT NULL DEFAULT 'PENDING',
    `watchId` VARCHAR(191) NOT NULL,

    INDEX `Inquiry_watchId_idx`(`watchId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Watch` ADD CONSTRAINT `Watch_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_watchId_fkey` FOREIGN KEY (`watchId`) REFERENCES `Watch`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inquiry` ADD CONSTRAINT `Inquiry_watchId_fkey` FOREIGN KEY (`watchId`) REFERENCES `Watch`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
