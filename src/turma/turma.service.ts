import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTurmaDto } from './dto/create-turma.dto';
import { UpdateTurmaDto } from './dto/update-turma.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationService } from 'src/common/pagination/pagination.service';

@Injectable()
export class TurmaService {
  constructor(
    private readonly prisma: PrismaService,
    private pagination: PaginationService,
  ) { }

  async create(createTurmaDto: CreateTurmaDto, tenantId: number) {
    const turma = await this.prisma.turma.create({
      data: {
        ...createTurmaDto,
        tenantId,
      },
    });

    return {
      message: 'Turma criada com sucesso',
      data: turma,
    }
  }

  async findAll(tenantId: number, page: number, limit: number) {
    return await this.pagination.paginate({
      model: this.prisma.turma,
      where: {
        tenantId: tenantId,
        deletedAt: null,
      },
      page,
      limit,
      orderBy: { nome: 'asc' },
    })
  }

  async findOne(id: number, tenantId: number) {
    const turma = await this.prisma.turma.findFirst({
      where: {
        id,
        tenantId,
        deletedAt: null,
      },
    });

    if (!turma) {
      throw new NotFoundException('Turma não encontrada');
    }

    return {
      message: 'Turma encontrada com sucesso',
      data: turma,
    };
  }

  async update(id: number, updateTurmaDto: UpdateTurmaDto, tenantId: number) {
    const turma = await this.prisma.turma.findFirst({
      where: {
        id,
        tenantId,
        deletedAt: null,
      },
    });

    if (!turma) {
      throw new NotFoundException('Turma não encontrada');
    }

    if (Object.keys(updateTurmaDto).length === 0) {
      throw new NotFoundException('Nenhum campo para atualizar');
    }

    const updatedTurma = await this.prisma.turma.update({
      where: { id: turma.id },
      data: updateTurmaDto,
    });

    return {
      message: 'Turma atualizada com sucesso',
      data: updatedTurma,
    };
  }

  async remove(id: number, tenantId: number) {
    const turma = await this.prisma.turma.findFirst({
      where: {
        id,
        tenantId,
        deletedAt: null,
      },
    });

    if (!turma) {
      throw new NotFoundException('Turma não encontrada');
    }

    await this.prisma.turma.update({
      where: { id: turma.id },
      data: { deletedAt: new Date() },
    });

    return {
      message: 'Turma removida com sucesso',
    };
  }
}
