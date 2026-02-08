import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAvaliacaoDto } from './dto/create-avaliacao.dto';
import { UpdateAvaliacaoDto } from './dto/update-avaliacao.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationService } from 'src/common/pagination/pagination.service';

@Injectable()
export class AvaliacaoService {
  constructor(
    private readonly prisma: PrismaService,
    private pagination: PaginationService,
  ) { }

  async create(createAvaliacaoDto: CreateAvaliacaoDto, tenantId: number) {
    const avaliacao = await this.prisma.avaliacao.create({
      data: {
        ...createAvaliacaoDto,
        tenantId,
      },
    });

    return {
      message: 'Avaliação criada com sucesso',
      data: avaliacao,
    }
  }

  async findAll(tenantId: number, page: number = 1, limit: number = 10) {
    return await this.pagination.paginate({
      model: this.prisma.avaliacao,
      where: {
        tenantId: tenantId,
      },
      page,
      limit,
      orderBy: { nome: 'asc' },
    })
  }

  async findOne(id: number, tenantId: number) {
    const avaliacao = await this.prisma.avaliacao.findFirst({
      where: {
        id,
        tenantId
      },
    });

    if (!avaliacao) {
      throw new NotFoundException('Avaliação não encontrada');
    }

    return {
      message: 'Avaliação encontrada com sucesso',
      data: avaliacao,
    };
  }

  async update(id: number, updateAvaliacaoDto: UpdateAvaliacaoDto, tenantId: number) {
    const avaliacao = await this.prisma.avaliacao.findFirst({
      where: {
        id,
        tenantId
      },
    });

    if (!avaliacao) {
      throw new NotFoundException('Avaliação não encontrada');
    }

    if (Object.keys(updateAvaliacaoDto).length === 0) {
      throw new NotFoundException('Nenhum campo para atualizar');
    }

    const updatedAvaliacao = await this.prisma.avaliacao.update({
      where: { id: avaliacao.id },
      data: updateAvaliacaoDto,
    });

    return {
      message: 'Avaliação atualizada com sucesso',
      data: updatedAvaliacao,
    };
  }

  async remove(id: number, tenantId: number) {
    await this.prisma.avaliacao.delete({
      where: {
        id,
        tenantId
      },
    });

    return {
      message: 'Avaliação removida com sucesso',
    };
  }
}
