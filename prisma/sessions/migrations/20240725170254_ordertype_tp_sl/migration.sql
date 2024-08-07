-- CreateTable
CREATE TABLE `session` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `time` DATETIME(3) NOT NULL,
    `totalOperations` INTEGER NOT NULL DEFAULT 0,
    `profitLoss` DOUBLE NOT NULL DEFAULT 0.0,
    `averageGain` DOUBLE NOT NULL DEFAULT 0.0,
    `maxDrawdown` DOUBLE NOT NULL DEFAULT 0.0,
    `winRate` DOUBLE NOT NULL DEFAULT 0.0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `startDate` DATETIME(3) NULL,
    `endDate` DATETIME(3) NULL,
    `currentCandleIndex` INTEGER NOT NULL DEFAULT 0,
    `accountSize` DOUBLE NOT NULL DEFAULT 0,
    `currentBalance` DOUBLE NOT NULL DEFAULT 0,
    `currency` VARCHAR(191) NOT NULL,
    `interval` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `operation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sessionId` INTEGER NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `orderType` VARCHAR(191) NOT NULL,
    `size` DOUBLE NOT NULL,
    `entryPrice` DOUBLE NOT NULL,
    `exitPrice` DOUBLE NULL,
    `profit` DOUBLE NULL,
    `tp` DOUBLE NULL,
    `sl` DOUBLE NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `operation` ADD CONSTRAINT `operation_sessionId_fkey` FOREIGN KEY (`sessionId`) REFERENCES `session`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
