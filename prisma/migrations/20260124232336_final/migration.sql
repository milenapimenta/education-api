/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `Avaliacao` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Questao` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Resposta` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `aluno_na_turma` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `aluno_na_turma` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `professor_na_turma` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `professor_na_turma` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `role_permissao` table. All the data in the column will be lost.
  - You are about to drop the column `roleNome` on the `role_permissao` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `role_permissao` table. All the data in the column will be lost.
  - You are about to drop the column `foto_perfil` on the `usuarios` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `usuarios` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[roleId,permissaoId]` on the table `role_permissao` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `roleId` to the `role_permissao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roleId` to the `usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "role_permissao_roleNome_permissaoId_key";

-- AlterTable
ALTER TABLE "Avaliacao" DROP COLUMN "deletedAt";

-- AlterTable
ALTER TABLE "Questao" DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Resposta" DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "aluno_na_turma" DROP COLUMN "createdAt",
DROP COLUMN "deletedAt";

-- AlterTable
ALTER TABLE "professor_na_turma" DROP COLUMN "createdAt",
DROP COLUMN "deletedAt";

-- AlterTable
ALTER TABLE "role_permissao" DROP COLUMN "createdAt",
DROP COLUMN "roleNome",
DROP COLUMN "updatedAt",
ADD COLUMN     "roleId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "usuarios" DROP COLUMN "foto_perfil",
DROP COLUMN "role",
ADD COLUMN     "roleId" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "roles" (
    "id" SERIAL NOT NULL,
    "tenantId" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "roles_tenantId_nome_key" ON "roles"("tenantId", "nome");

-- CreateIndex
CREATE UNIQUE INDEX "role_permissao_roleId_permissaoId_key" ON "role_permissao"("roleId", "permissaoId");

-- AddForeignKey
ALTER TABLE "roles" ADD CONSTRAINT "roles_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "escolas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permissao" ADD CONSTRAINT "role_permissao_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuarios" ADD CONSTRAINT "usuarios_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
