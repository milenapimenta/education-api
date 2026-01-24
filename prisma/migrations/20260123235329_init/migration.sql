/*
  Warnings:

  - You are about to drop the column `papel` on the `usuarios` table. All the data in the column will be lost.
  - You are about to drop the `tprofessor_na_turma` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `role` to the `usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'DIRETOR', 'PROFESSOR', 'ALUNO');

-- DropForeignKey
ALTER TABLE "tprofessor_na_turma" DROP CONSTRAINT "tprofessor_na_turma_professorId_fkey";

-- DropForeignKey
ALTER TABLE "tprofessor_na_turma" DROP CONSTRAINT "tprofessor_na_turma_turmaId_fkey";

-- AlterTable
ALTER TABLE "usuarios" DROP COLUMN "papel",
ADD COLUMN     "role" "Role" NOT NULL;

-- DropTable
DROP TABLE "tprofessor_na_turma";

-- DropEnum
DROP TYPE "PapelUsuario";

-- CreateTable
CREATE TABLE "professor_na_turma" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "professorId" TEXT NOT NULL,
    "turmaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "professor_na_turma_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "professor_na_turma_professorId_turmaId_key" ON "professor_na_turma"("professorId", "turmaId");

-- AddForeignKey
ALTER TABLE "professor_na_turma" ADD CONSTRAINT "professor_na_turma_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "professor_na_turma" ADD CONSTRAINT "professor_na_turma_turmaId_fkey" FOREIGN KEY ("turmaId") REFERENCES "turmas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
