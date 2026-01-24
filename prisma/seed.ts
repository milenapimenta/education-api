import 'dotenv/config';
import * as bcrypt from 'bcrypt';
import { PrismaClient, Role } from '@prisma/client';
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

  const senhaHash = await bcrypt.hash('123456', 10);

  const escolaAlpha = await prisma.escola.create({
    data: {
      nome: 'Escola Alpha',
      slug: 'escola-alpha',
    },
  });

  const escolaBeta = await prisma.escola.create({
    data: {
      nome: 'Escola Beta',
      slug: 'escola-beta',
    },
  });

  const emailAdmin = 'admin@escola.com';

  await prisma.usuario.create({
    data: {
      tenantId: escolaAlpha.id,
      nome: 'Admin Alpha',
      email: emailAdmin,
      senha: senhaHash,
      documento: '00000000191',
      role: Role.ADMIN,
      data_nascimento: new Date('1985-01-10'),
    },
  });

  await prisma.usuario.create({
    data: {
      tenantId: escolaBeta.id,
      nome: 'Admin Beta',
      email: emailAdmin,
      senha: senhaHash,
      documento: '00000000272',
      role: Role.ADMIN,
      data_nascimento: new Date('1987-03-22'),
    },
  });

  const professorAlpha = await prisma.usuario.create({
    data: {
      tenantId: escolaAlpha.id,
      nome: 'Professor João',
      email: 'joao@alpha.com',
      senha: senhaHash,
      documento: '11111111111',
      role: Role.PROFESSOR,
      data_nascimento: new Date('1990-06-15'),
    },
  });

  const alunoAlpha = await prisma.usuario.create({
    data: {
      tenantId: escolaAlpha.id,
      nome: 'Aluno Maria',
      email: 'maria@alpha.com',
      senha: senhaHash,
      documento: '22222222222',
      role: Role.ALUNO,
      data_nascimento: new Date('2012-09-03'),
    },
  });

  const cursoAlpha = await prisma.curso.create({
    data: {
      tenantId: escolaAlpha.id,
      nome: 'Ensino Fundamental',
      descricao: 'Curso fundamental da Escola Alpha',
    },
  });

  const turmaA = await prisma.turma.create({
    data: {
      tenantId: escolaAlpha.id,
      nome: 'Turma A',
      ano: 2026,
      cursoId: cursoAlpha.id,
    },
  });

  await prisma.professorNaTurma.create({
    data: {
      tenantId: escolaAlpha.id,
      professorId: professorAlpha.id,
      turmaId: turmaA.id,
    },
  });

  await prisma.alunoNaTurma.create({
    data: {
      tenantId: escolaAlpha.id,
      alunoId: alunoAlpha.id,
      turmaId: turmaA.id,
    },
  });

  console.log('✅ Seed finalizado com sucesso!');
}

main()
  .catch((error) => {
    console.error('❌ Erro ao executar seed:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
