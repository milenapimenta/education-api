/*
  Warnings:

  - A unique constraint covering the columns `[nome,tenantId]` on the table `roles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `scope` to the `roles` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RoleScope" AS ENUM ('GLOBAL', 'TENANT');

-- DropIndex
DROP INDEX "roles_tenantId_nome_key";

-- AlterTable
ALTER TABLE "roles" ADD COLUMN     "scope" "RoleScope" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "roles_nome_tenantId_key" ON "roles"("nome", "tenantId");
