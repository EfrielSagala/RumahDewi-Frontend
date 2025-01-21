/*
  Warnings:

  - The values [TIDAK_TERSEDIA] on the enum `rooms_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `rooms` MODIFY `status` ENUM('TERSEDIA', 'DIPESAN', 'TERISI') NOT NULL DEFAULT 'TERSEDIA';
