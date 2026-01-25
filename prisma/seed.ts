import 'dotenv/config';
import * as bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Iniciando seed...');

  const senha = await bcrypt.hash('123456', 10);

  // =========================
  // ESCOLAS
  // =========================
  const escolaA = await prisma.escola.create({
    data: { nome: 'Escola Alpha', slug: 'escola-alpha' },
  });

  const escolaB = await prisma.escola.create({
    data: { nome: 'Escola Beta', slug: 'escola-beta' },
  });

  // =========================
  // ROLES (por tenant)
  // =========================
  const createRoles = async (tenantId: number, nomes: string[]) => {
    await prisma.role.createMany({
      data: nomes.map(nome => ({ nome, tenantId })),
    });

    return prisma.role.findMany({ where: { tenantId } });
  };

  const rolesA = await createRoles(escolaA.id, [
    'ADMIN',
    'DIRETOR',
    'PROFESSOR',
    'ALUNO',
  ]);

  const rolesB = await createRoles(escolaB.id, [
    'ADMIN',
    'DIRETOR',
    'PROFESSOR',
  ]);

  const roleByName = (roles: any[], nome: string) =>
    roles.find(r => r.nome === nome)!;

  // =========================
  // PERMISSÕES (globais)
  // =========================
  await prisma.permissao.createMany({
    data: [
      { nome: 'criar_usuario', descricao: 'Criar usuário' },
      { nome: 'criar_turma', descricao: 'Criar turma' },
      { nome: 'matricular_aluno', descricao: 'Matricular aluno' },
      { nome: 'criar_avaliacao', descricao: 'Criar avaliação' },
      { nome: 'lancar_nota', descricao: 'Lançar nota' },
    ],
  });

  const permissoes = await prisma.permissao.findMany();

  // ADMIN da Escola A recebe todas as permissões
  for (const p of permissoes) {
    await prisma.rolePermissao.create({
      data: {
        roleId: roleByName(rolesA, 'ADMIN').id,
        permissaoId: p.id,
      },
    });
  }

  // =========================
  // USUÁRIOS – ESCOLA A
  // =========================
  const adminA = await prisma.usuario.create({
    data: {
      tenantId: escolaA.id,
      roleId: roleByName(rolesA, 'ADMIN').id,
      nome: 'Admin Alpha',
      email: 'admin@alpha.com',
      senha,
      documento: 'A001',
      data_nascimento: new Date('1985-01-01'),
    },
  });

  const professorA = await prisma.usuario.create({
    data: {
      tenantId: escolaA.id,
      roleId: roleByName(rolesA, 'PROFESSOR').id,
      nome: 'Professor João',
      email: 'joao@alpha.com',
      senha,
      documento: 'A002',
      data_nascimento: new Date('1990-01-01'),
    },
  });

  const alunoA = await prisma.usuario.create({
    data: {
      tenantId: escolaA.id,
      roleId: roleByName(rolesA, 'ALUNO').id,
      nome: 'Aluno Maria',
      email: 'maria@alpha.com',
      senha,
      documento: 'A003',
      data_nascimento: new Date('2012-01-01'),
    },
  });

  // =========================
  // CURSO / TURMA – ESCOLA A
  // =========================
  const cursoA = await prisma.curso.create({
    data: {
      tenantId: escolaA.id,
      nome: 'Ensino Fundamental',
    },
  });

  const turmaA = await prisma.turma.create({
    data: {
      tenantId: escolaA.id,
      nome: 'Turma A',
      ano: 2026,
      cursoId: cursoA.id,
    },
  });

  await prisma.professorNaTurma.create({
    data: {
      tenantId: escolaA.id,
      professorId: professorA.id,
      turmaId: turmaA.id,
    },
  });

  await prisma.alunoNaTurma.create({
    data: {
      tenantId: escolaA.id,
      alunoId: alunoA.id,
      turmaId: turmaA.id,
    },
  });

  // =========================
  // AVALIAÇÃO – ESCOLA A
  // =========================
  const avaliacao = await prisma.avaliacao.create({
    data: {
      tenantId: escolaA.id,
      turmaId: turmaA.id,
      nome: 'Prova de Matemática',
      data: new Date(),
    },
  });

  const questao = await prisma.questao.create({
    data: {
      avaliacaoId: avaliacao.id,
      texto: '2 + 2 = ?',
      peso: 1,
      opcoes: ['A) 3', 'B) 4', 'C) 5'],
      respostaCorreta: 'B',
    },
  });

  await prisma.resposta.create({
    data: {
      questaoId: questao.id,
      alunoId: alunoA.id,
      valor: 'B',
    },
  });

  // =========================
  // USUÁRIO – ESCOLA B (mínimo)
  // =========================
  await prisma.usuario.create({
    data: {
      tenantId: escolaB.id,
      roleId: roleByName(rolesB, 'ADMIN').id,
      nome: 'Admin Beta',
      email: 'admin@beta.com',
      senha,
      documento: 'B001',
      data_nascimento: new Date('1980-01-01'),
    },
  });

  console.log('✅ Seed finalizado com sucesso!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
