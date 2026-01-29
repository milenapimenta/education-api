import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationService } from 'src/common/pagination/pagination.service';

@Injectable()
export class CursoService {
  constructor(
    private readonly prisma: PrismaService,
    private pagination: PaginationService
  ) {}

  async create(createCursoDto: CreateCursoDto, tenantId: number) {
    const curso = await this.prisma.curso.create({
      data: {
        ...createCursoDto,
        tenantId,
      },
    });

    return {
      message: 'Curso criado com sucesso!',
      data: curso,
    };
  }

  async findAll(tenantId: number, page: number = 1, limit: number = 10) {
    return await this.pagination.paginate({
      model: this.prisma.curso,
      where: {
        tenantId,
        deletedAt: null,
      },
      page,
      limit,
      orderBy: {
        createdAt: 'desc',
      },
    }) 
  }

  async findOne(id: number, tenantId: number) {
    const curso = await this.prisma.curso.findFirst({
      where: {
        id,
        tenantId,
        deletedAt: null,
      },
    });

    if (!curso) {
      throw new NotFoundException('Curso não encontrado para este tenant');
    }

    return {
      message: 'Curso encontrado com sucesso!',
      data: curso,
    };
  }

  async update(id: number, tenantId: number, updateCursoDto: UpdateCursoDto) {
    const curso = await this.prisma.curso.findFirst({
      where: {
        id,
        tenantId,
        deletedAt: null,
      },
    });

    if (!curso) {
      throw new NotFoundException('Curso não encontrado');
    }

    if (Object.keys(updateCursoDto).length === 0) {
      throw new NotFoundException('Nenhum campo para atualizar');
    }

    const cursoAtualizado = await this.prisma.curso.update({
      where: { id: curso.id },
      data: updateCursoDto,
    });

    return {
      message: 'Curso atualizado com sucesso!',
      data: cursoAtualizado,
    };
  }

  async remove(id: number, tenantId: number) {
    const curso = await this.prisma.curso.findFirst({
      where: {
        id,
        tenantId,
        deletedAt: null,
      },
    });

    if (!curso) {
      throw new NotFoundException('Curso não encontrado');
    }

    await this.prisma.curso.update({
      where: { id: curso.id },
      data: { deletedAt: new Date() },
    });

    return {
      message: 'Curso removido com sucesso!',
    };
  }
}
