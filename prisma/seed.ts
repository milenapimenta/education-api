import 'dotenv/config';
import * as bcrypt from 'bcrypt';
import { PrismaClient, UserRole } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log('🌱 Iniciando seed...');

  const passwordHash = await bcrypt.hash('123456', 10);

  const schoolA = await prisma.school.create({
    data: { name: 'Escola Alpha', slug: 'escola-alpha' },
  });

  const schoolB = await prisma.school.create({
    data: { name: 'Escola Beta', slug: 'escola-beta' },
  });

  const adminEmail = 'admin@escola.com';

  await prisma.user.create({
    data: {
      tenantId: schoolA.id,
      name: 'Admin Alpha',
      email: adminEmail,
      password: passwordHash,
      role: UserRole.ADMIN,
    },
  });

  await prisma.user.create({
    data: {
      tenantId: schoolB.id,
      name: 'Admin Beta',
      email: adminEmail,
      password: passwordHash,
      role: UserRole.ADMIN,
    },
  });

  const teacherA = await prisma.user.create({
    data: {
      tenantId: schoolA.id,
      name: 'Professor João',
      email: 'joao@alpha.com',
      password: passwordHash,
      role: UserRole.TEACHER,
    },
  });

  const studentA = await prisma.user.create({
    data: {
      tenantId: schoolA.id,
      name: 'Aluno Maria',
      email: 'maria@alpha.com',
      password: passwordHash,
      role: UserRole.STUDENT,
    },
  });

  const courseA = await prisma.course.create({
    data: {
      tenantId: schoolA.id,
      name: 'Ensino Fundamental',
      description: 'Curso fundamental da Escola Alpha',
    },
  });

  const classA = await prisma.classRoom.create({
    data: {
      tenantId: schoolA.id,
      name: 'Turma A',
      year: 2026,
      courseId: courseA.id,
    },
  });

  await prisma.teacherOnClass.create({
    data: {
      tenantId: schoolA.id,
      teacherId: teacherA.id,
      classId: classA.id,
    },
  });

  await prisma.studentOnClass.create({
    data: {
      tenantId: schoolA.id,
      studentId: studentA.id,
      classId: classA.id,
    },
  });

  console.log('✅ Seed finalizado com sucesso!');
}

main()
  .catch(console.error)
  .finally(async () => prisma.$disconnect());
