/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `Team` DROP FOREIGN KEY `Team_adminId_fkey`;

-- DropForeignKey
ALTER TABLE `TeamMember` DROP FOREIGN KEY `TeamMember_userId_fkey`;

-- DropForeignKey
ALTER TABLE `UserTodo` DROP FOREIGN KEY `UserTodo_userId_fkey`;

-- DropIndex
DROP INDEX `Team_adminId_fkey` ON `Team`;

-- DropIndex
DROP INDEX `UserTodo_userId_fkey` ON `UserTodo`;

-- AlterTable
ALTER TABLE `Team` MODIFY `adminId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `TeamMember` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `UserTodo` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Team` ADD CONSTRAINT `Team_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeamMember` ADD CONSTRAINT `TeamMember_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserTodo` ADD CONSTRAINT `UserTodo_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
