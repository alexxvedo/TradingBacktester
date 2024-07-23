-- CreateTable
CREATE TABLE `HistoricalData` (
    `timestamp` TIMESTAMP(0) NOT NULL,
    `currency` VARCHAR(191) NOT NULL,
    `open` DOUBLE NOT NULL,
    `high` DOUBLE NOT NULL,
    `low` DOUBLE NOT NULL,
    `close` DOUBLE NOT NULL,
    `interval` VARCHAR(191) NOT NULL,

    INDEX `HistoricalData_timestamp_currency_interval_idx`(`timestamp`, `currency`, `interval`),
    PRIMARY KEY (`timestamp`, `currency`, `interval`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
