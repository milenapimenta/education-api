/*
  Warnings:

  - You are about to drop the `ClassRoom` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Course` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `School` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudentOnClass` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TeacherOnClass` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "PapelUsuario" AS ENUM ('ADMIN', 'DIRETOR', 'PROFESSOR', 'ALUNO');

-- DropForeignKey
ALTER TABLE "ClassRoom" DROP CONSTRAINT "ClassRoom_courseId_fkey";

-- DropForeignKey
ALTER TABLE "ClassRoom" DROP CONSTRAINT "ClassRoom_tenantId_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_tenantId_fkey";

-- DropForeignKey
ALTER TABLE "StudentOnClass" DROP CONSTRAINT "StudentOnClass_classId_fkey";

-- DropForeignKey
ALTER TABLE "StudentOnClass" DROP CONSTRAINT "StudentOnClass_studentId_fkey";

-- DropForeignKey
ALTER TABLE "TeacherOnClass" DROP CONSTRAINT "TeacherOnClass_classId_fkey";

-- DropForeignKey
ALTER TABLE "TeacherOnClass" DROP CONSTRAINT "TeacherOnClass_teacherId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_tenantId_fkey";

-- DropTable
DROP TABLE "ClassRoom";

-- DropTable
DROP TABLE "Course";

-- DropTable
DROP TABLE "School";

-- DropTable
DROP TABLE "StudentOnClass";

-- DropTable
DROP TABLE "TeacherOnClass";

-- DropTable
DROP TABLE "User";

-- DropEnum
DROP TYPE "UserRole";

-- CreateTable
CREATE TABLE "schools" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "ativa" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "schools_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "papel" "PapelUsuario" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "courses" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "class_rooms" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "cursoId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "ano" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "class_rooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teachers_on_classes" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "professorId" TEXT NOT NULL,
    "turmaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "teachers_on_classes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "students_on_classes" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "alunoId" TEXT NOT NULL,
    "turmaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "students_on_classes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "schools_slug_key" ON "schools"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_tenantId_key" ON "users"("email", "tenantId");

-- CreateIndex
CREATE UNIQUE INDEX "teachers_on_classes_professorId_turmaId_key" ON "teachers_on_classes"("professorId", "turmaId");

-- CreateIndex
CREATE UNIQUE INDEX "students_on_classes_alunoId_turmaId_key" ON "students_on_classes"("alunoId", "turmaId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "schools"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "schools"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_rooms" ADD CONSTRAINT "class_rooms_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "schools"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_rooms" ADD CONSTRAINT "class_rooms_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teachers_on_classes" ADD CONSTRAINT "teachers_on_classes_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teachers_on_classes" ADD CONSTRAINT "teachers_on_classes_turmaId_fkey" FOREIGN KEY ("turmaId") REFERENCES "class_rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students_on_classes" ADD CONSTRAINT "students_on_classes_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students_on_classes" ADD CONSTRAINT "students_on_classes_turmaId_fkey" FOREIGN KEY ("turmaId") REFERENCES "class_rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
