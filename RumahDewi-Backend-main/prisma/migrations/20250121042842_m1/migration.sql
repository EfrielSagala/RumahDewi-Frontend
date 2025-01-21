/*
  Warnings:

  - The values [TERISI] on the enum `rooms_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `rooms` MODIFY `status` ENUM('TERSEDIA', 'DIPESAN', 'TIDAK_TERSEDIA') NOT NULL DEFAULT 'TERSEDIA';
