import 'dotenv/config'
import { PrismaClient, RoleScope, Permissao } from '@prisma/client'
import { faker } from '@faker-js/faker'
import * as bcrypt from 'bcrypt'
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Iniciando seed...')

  const permissoesBase = [
    { nome: 'USUARIO_CRIAR', descricao: 'Criar usuário' },
    { nome: 'USUARIO_LISTAR', descricao: 'Listar usuários' },
    { nome: 'USUARIO_EDITAR', descricao: 'Editar usuário' },
    { nome: 'USUARIO_REMOVER', descricao: 'Remover usuário' },
  ]

  const permissoes: Permissao[] = []

  for (const perm of permissoesBase) {
    const permissao = await prisma.permissao.create({
      data: perm,
    })

    permissoes.push(permissao)
  }

  const adminGlobalRole = await prisma.role.create({
    data: {
      nome: 'ADMIN',
      scope: RoleScope.GLOBAL,
      tenantId: null,
      permissoes: {
        create: permissoes.map((p) => ({
          permissaoId: p.id,
        })),
      },
    },
  })

  const professorRole = await prisma.role.create({
    data: {
      nome: 'PROFESSOR',
      scope: RoleScope.GLOBAL,
      tenantId: null,
    },
  })

  const alunoRole = await prisma.role.create({
    data: {
      nome: 'ALUNO',
      scope: RoleScope.GLOBAL,
      tenantId: null,
    },
  })

  const diretorRole = await prisma.role.create({
    data: {
      nome: 'DIRETOR',
      scope: RoleScope.GLOBAL,
      tenantId: null,
    },
  })

  const coordenadorRole = await prisma.role.create({
    data: {
      nome: 'COORDENADOR',
      scope: RoleScope.GLOBAL,
      tenantId: null,
    },
  })

  const senhaHash = await bcrypt.hash('123456', 10)

  await prisma.usuario.create({
    data: {
      nome: 'Administrador Global',
      email: 'admin@admin.com',
      senha: senhaHash,
      documento: '00000000000',
      data_nascimento: new Date('1990-01-01'),
      tenantId: null,
      roleId: adminGlobalRole.id,
    },
  })

  for (let i = 0; i < 3; i++) {
    const nomeEscola = faker.company.name()

    const escola = await prisma.escola.create({
      data: {
        nome: nomeEscola,
        slug: faker.helpers.slugify(nomeEscola).toLowerCase(),
        cnpj: faker.string.numeric(14),
      },
    })

    const curso = await prisma.curso.create({
      data: {
        nome: faker.company.buzzPhrase(),
        descricao: faker.lorem.sentence(),
        tenantId: escola.id,
      },
    })

    const turma = await prisma.turma.create({
      data: {
        nome: `Turma ${faker.string.alphanumeric(3).toUpperCase()}`,
        ano: 2025,
        tenantId: escola.id,
        cursoId: curso.id,
      },
    })

    await prisma.usuario.create({
      data: {
        nome: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        senha: senhaHash,
        documento: faker.string.numeric(11),
        data_nascimento: faker.date.birthdate(),
        tenantId: escola.id,
        roleId: diretorRole.id,
      },
    })

    await prisma.usuario.create({
      data: {
        nome: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        senha: senhaHash,
        documento: faker.string.numeric(11),
        data_nascimento: faker.date.birthdate(),
        tenantId: escola.id,
        roleId: coordenadorRole.id,
      },
    })

    const professor = await prisma.usuario.create({
      data: {
        nome: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        senha: senhaHash,
        documento: faker.string.numeric(11),
        data_nascimento: faker.date.birthdate(),
        tenantId: escola.id,
        roleId: professorRole.id,
      },
    })

    await prisma.professorNaTurma.create({
      data: {
        tenantId: escola.id,
        professorId: professor.id,
        turmaId: turma.id,
      },
    })

    for (let j = 0; j < 5; j++) {
      const aluno = await prisma.usuario.create({
        data: {
          nome: faker.person.fullName(),
          email: faker.internet.email().toLowerCase(),
          senha: senhaHash,
          documento: faker.string.numeric(11),
          data_nascimento: faker.date.birthdate(),
          tenantId: escola.id,
          roleId: alunoRole.id,
        },
      })

      await prisma.alunoNaTurma.create({
        data: {
          tenantId: escola.id,
          alunoId: aluno.id,
          turmaId: turma.id,
        },
      })
    }

    const avaliacao = await prisma.avaliacao.create({
      data: {
        nome: 'Prova 1',
        descricao: 'Avaliação inicial',
        data: new Date(),
        tenantId: escola.id,
        turmaId: turma.id,
      },
    })

    await prisma.questao.create({
      data: {
        avaliacaoId: avaliacao.id,
        texto: 'Quanto é 2 + 2?',
        peso: 1,
        opcoes: ['1', '2', '3', '4'],
        respostaCorreta: '4',
      },
    })
  }

  console.log('✅ Seed finalizado com sucesso!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
