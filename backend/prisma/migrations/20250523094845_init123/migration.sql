/*
  Warnings:

  - You are about to drop the `Team` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TeamMember` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TeamTodo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserTodo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Team` DROP FOREIGN KEY `Team_adminId_fkey`;

-- DropForeignKey
ALTER TABLE `TeamMember` DROP FOREIGN KEY `TeamMember_teamId_fkey`;

-- DropForeignKey
ALTER TABLE `TeamMember` DROP FOREIGN KEY `TeamMember_userId_fkey`;

-- DropForeignKey
ALTER TABLE `TeamTodo` DROP FOREIGN KEY `TeamTodo_teamId_fkey`;

-- DropForeignKey
ALTER TABLE `UserTodo` DROP FOREIGN KEY `UserTodo_userId_fkey`;

-- DropTable
DROP TABLE `Team`;

-- DropTable
DROP TABLE `TeamMember`;

-- DropTable
DROP TABLE `TeamTodo`;

-- DropTable
DROP TABLE `User`;

-- DropTable
DROP TABLE `UserTodo`;

-- CreateTable
CREATE TABLE `Users` (
    `id` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Teams` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `adminId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TeamMembers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `teamId` INTEGER NOT NULL,

    UNIQUE INDEX `TeamMembers_userId_teamId_key`(`userId`, `teamId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserTodos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `contents` VARCHAR(191) NOT NULL,
    `isDone` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TeamTodos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `teamId` INTEGER NOT NULL,
    `contents` VARCHAR(191) NOT NULL,
    `isDone` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Teams` ADD CONSTRAINT `Teams_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeamMembers` ADD CONSTRAINT `TeamMembers_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeamMembers` ADD CONSTRAINT `TeamMembers_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Teams`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserTodos` ADD CONSTRAINT `UserTodos_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeamTodos` ADD CONSTRAINT `TeamTodos_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Teams`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
