/*
  Warnings:

  - The primary key for the `aluno_na_turma` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `aluno_na_turma` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `cursos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `cursos` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `escolas` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `escolas` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `professor_na_turma` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `professor_na_turma` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `turmas` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `turmas` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `usuarios` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `usuarios` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[email,tenantId,documento]` on the table `usuarios` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `tenantId` on the `aluno_na_turma` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `alunoId` on the `aluno_na_turma` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `turmaId` on the `aluno_na_turma` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `tenantId` on the `cursos` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `tenantId` on the `professor_na_turma` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `professorId` on the `professor_na_turma` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `turmaId` on the `professor_na_turma` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `tenantId` on the `turmas` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `cursoId` on the `turmas` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `documento` to the `usuarios` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `tenantId` on the `usuarios` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "aluno_na_turma" DROP CONSTRAINT "aluno_na_turma_alunoId_fkey";

-- DropForeignKey
ALTER TABLE "aluno_na_turma" DROP CONSTRAINT "aluno_na_turma_turmaId_fkey";

-- DropForeignKey
ALTER TABLE "cursos" DROP CONSTRAINT "cursos_tenantId_fkey";

-- DropForeignKey
ALTER TABLE "professor_na_turma" DROP CONSTRAINT "professor_na_turma_professorId_fkey";

-- DropForeignKey
ALTER TABLE "professor_na_turma" DROP CONSTRAINT "professor_na_turma_turmaId_fkey";

-- DropForeignKey
ALTER TABLE "turmas" DROP CONSTRAINT "turmas_cursoId_fkey";

-- DropForeignKey
ALTER TABLE "turmas" DROP CONSTRAINT "turmas_tenantId_fkey";

-- DropForeignKey
ALTER TABLE "usuarios" DROP CONSTRAINT "usuarios_tenantId_fkey";

-- DropIndex
DROP INDEX "usuarios_email_tenantId_key";

-- AlterTable
ALTER TABLE "aluno_na_turma" DROP CONSTRAINT "aluno_na_turma_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "tenantId",
ADD COLUMN     "tenantId" INTEGER NOT NULL,
DROP COLUMN "alunoId",
ADD COLUMN     "alunoId" INTEGER NOT NULL,
DROP COLUMN "turmaId",
ADD COLUMN     "turmaId" INTEGER NOT NULL,
ADD CONSTRAINT "aluno_na_turma_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "cursos" DROP CONSTRAINT "cursos_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "tenantId",
ADD COLUMN     "tenantId" INTEGER NOT NULL,
ADD CONSTRAINT "cursos_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "escolas" DROP CONSTRAINT "escolas_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "escolas_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "professor_na_turma" DROP CONSTRAINT "professor_na_turma_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "tenantId",
ADD COLUMN     "tenantId" INTEGER NOT NULL,
DROP COLUMN "professorId",
ADD COLUMN     "professorId" INTEGER NOT NULL,
DROP COLUMN "turmaId",
ADD COLUMN     "turmaId" INTEGER NOT NULL,
ADD CONSTRAINT "professor_na_turma_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "turmas" DROP CONSTRAINT "turmas_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "tenantId",
ADD COLUMN     "tenantId" INTEGER NOT NULL,
DROP COLUMN "cursoId",
ADD COLUMN     "cursoId" INTEGER NOT NULL,
ADD CONSTRAINT "turmas_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "usuarios" DROP CONSTRAINT "usuarios_pkey",
ADD COLUMN     "documento" TEXT NOT NULL,
ADD COLUMN     "foto_perfil" TEXT,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "tenantId",
ADD COLUMN     "tenantId" INTEGER NOT NULL,
ADD CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "aluno_na_turma_alunoId_turmaId_key" ON "aluno_na_turma"("alunoId", "turmaId");

-- CreateIndex
CREATE UNIQUE INDEX "professor_na_turma_professorId_turmaId_key" ON "professor_na_turma"("professorId", "turmaId");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_tenantId_documento_key" ON "usuarios"("email", "tenantId", "documento");

-- AddForeignKey
ALTER TABLE "usuarios" ADD CONSTRAINT "usuarios_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "escolas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cursos" ADD CONSTRAINT "cursos_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "escolas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "turmas" ADD CONSTRAINT "turmas_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "escolas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "turmas" ADD CONSTRAINT "turmas_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "cursos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "professor_na_turma" ADD CONSTRAINT "professor_na_turma_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "professor_na_turma" ADD CONSTRAINT "professor_na_turma_turmaId_fkey" FOREIGN KEY ("turmaId") REFERENCES "turmas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aluno_na_turma" ADD CONSTRAINT "aluno_na_turma_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aluno_na_turma" ADD CONSTRAINT "aluno_na_turma_turmaId_fkey" FOREIGN KEY ("turmaId") REFERENCES "turmas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
