import 'dotenv/config';
import * as bcrypt from 'bcrypt';
import { PrismaClient, Role } from '@prisma/client';
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

  // ESCOLA
  const escola = await prisma.escola.create({
    data: { nome: 'Escola Alpha', slug: 'escola-alpha' },
  });

  // ROLES
  await prisma.role.createMany({
    data: [
      { nome: 'ADMIN', tenantId: escola.id },
      { nome: 'DIRETOR', tenantId: escola.id },
      { nome: 'PROFESSOR', tenantId: escola.id },
      { nome: 'ALUNO', tenantId: escola.id },
    ],
  });

  const roles = await prisma.role.findMany({ where: { tenantId: escola.id } });
  const role = (nome: string) => roles.find(r => r.nome === nome)!;

  // PERMISSÕES
  const permissoes = await prisma.permissao.createMany({
    data: [
      { nome: 'criar_usuario', descricao: 'Criar usuário' },
      { nome: 'criar_turma', descricao: 'Criar turma' },
      { nome: 'matricular_aluno', descricao: 'Matricular aluno' },
      { nome: 'criar_avaliacao', descricao: 'Criar avaliação' },
      { nome: 'lancar_nota', descricao: 'Lançar nota' },
    ],
  });

  const perms = await prisma.permissao.findMany();

  for (const p of perms) {
    await prisma.rolePermissao.create({
      data: { roleId: role('ADMIN').id, permissaoId: p.id },
    });
  }

  // USUÁRIOS
  const admin = await prisma.usuario.create({
    data: {
      tenantId: escola.id,
      roleId: role('ADMIN').id,
      nome: 'Admin',
      email: 'admin@alpha.com',
      senha,
      documento: '0001',
      data_nascimento: new Date('1985-01-01'),
    },
  });

  const professor = await prisma.usuario.create({
    data: {
      tenantId: escola.id,
      roleId: role('PROFESSOR').id,
      nome: 'Professor João',
      email: 'joao@alpha.com',
      senha,
      documento: '0002',
      data_nascimento: new Date('1990-01-01'),
    },
  });

  const aluno = await prisma.usuario.create({
    data: {
      tenantId: escola.id,
      roleId: role('ALUNO').id,
      nome: 'Aluno Maria',
      email: 'maria@alpha.com',
      senha,
      documento: '0003',
      data_nascimento: new Date('2012-01-01'),
    },
  });

  // CURSO / TURMA
  const curso = await prisma.curso.create({
    data: {
      tenantId: escola.id,
      nome: 'Ensino Fundamental',
    },
  });

  const turma = await prisma.turma.create({
    data: {
      tenantId: escola.id,
      nome: 'Turma A',
      ano: 2026,
      cursoId: curso.id,
    },
  });

  await prisma.professorNaTurma.create({
    data: {
      tenantId: escola.id,
      professorId: professor.id,
      turmaId: turma.id,
    },
  });

  await prisma.alunoNaTurma.create({
    data: {
      tenantId: escola.id,
      alunoId: aluno.id,
      turmaId: turma.id,
    },
  });

  // AVALIAÇÃO
  const avaliacao = await prisma.avaliacao.create({
    data: {
      tenantId: escola.id,
      turmaId: turma.id,
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
      alunoId: aluno.id,
      valor: 'B',
    },
  });

  console.log('✅ Seed finalizado com sucesso!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
