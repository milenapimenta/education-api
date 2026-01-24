/*
  Warnings:

  - You are about to drop the `class_rooms` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `courses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `schools` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `students_on_classes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `teachers_on_classes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "class_rooms" DROP CONSTRAINT "class_rooms_cursoId_fkey";

-- DropForeignKey
ALTER TABLE "class_rooms" DROP CONSTRAINT "class_rooms_tenantId_fkey";

-- DropForeignKey
ALTER TABLE "courses" DROP CONSTRAINT "courses_tenantId_fkey";

-- DropForeignKey
ALTER TABLE "students_on_classes" DROP CONSTRAINT "students_on_classes_alunoId_fkey";

-- DropForeignKey
ALTER TABLE "students_on_classes" DROP CONSTRAINT "students_on_classes_turmaId_fkey";

-- DropForeignKey
ALTER TABLE "teachers_on_classes" DROP CONSTRAINT "teachers_on_classes_professorId_fkey";

-- DropForeignKey
ALTER TABLE "teachers_on_classes" DROP CONSTRAINT "teachers_on_classes_turmaId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_tenantId_fkey";

-- DropTable
DROP TABLE "class_rooms";

-- DropTable
DROP TABLE "courses";

-- DropTable
DROP TABLE "schools";

-- DropTable
DROP TABLE "students_on_classes";

-- DropTable
DROP TABLE "teachers_on_classes";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "escolas" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "ativa" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "escolas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "papel" "PapelUsuario" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cursos" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "cursos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "turmas" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "cursoId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "ano" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "turmas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tprofessor_na_turma" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "professorId" TEXT NOT NULL,
    "turmaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "tprofessor_na_turma_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "aluno_na_turma" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "alunoId" TEXT NOT NULL,
    "turmaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "aluno_na_turma_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "escolas_slug_key" ON "escolas"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_tenantId_key" ON "usuarios"("email", "tenantId");

-- CreateIndex
CREATE UNIQUE INDEX "tprofessor_na_turma_professorId_turmaId_key" ON "tprofessor_na_turma"("professorId", "turmaId");

-- CreateIndex
CREATE UNIQUE INDEX "aluno_na_turma_alunoId_turmaId_key" ON "aluno_na_turma"("alunoId", "turmaId");

-- AddForeignKey
ALTER TABLE "usuarios" ADD CONSTRAINT "usuarios_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "escolas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cursos" ADD CONSTRAINT "cursos_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "escolas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "turmas" ADD CONSTRAINT "turmas_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "escolas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "turmas" ADD CONSTRAINT "turmas_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "cursos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tprofessor_na_turma" ADD CONSTRAINT "tprofessor_na_turma_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tprofessor_na_turma" ADD CONSTRAINT "tprofessor_na_turma_turmaId_fkey" FOREIGN KEY ("turmaId") REFERENCES "turmas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aluno_na_turma" ADD CONSTRAINT "aluno_na_turma_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aluno_na_turma" ADD CONSTRAINT "aluno_na_turma_turmaId_fkey" FOREIGN KEY ("turmaId") REFERENCES "turmas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
