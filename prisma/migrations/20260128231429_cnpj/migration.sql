/*
  Warnings:

  - A unique constraint covering the columns `[cnpj]` on the table `escolas` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cnpj` to the `escolas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "escolas" ADD COLUMN     "cnpj" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "escolas_cnpj_key" ON "escolas"("cnpj");
