import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEscolaDto } from './dto/create-escola.dto';
import { UpdateEscolaDto } from './dto/update-escola.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationService } from 'src/common/pagination/pagination.service';

@Injectable()
export class EscolaService {
  constructor(
    private readonly prisma: PrismaService,
    private pagination: PaginationService,
  ) { }

  async create(createEscolaDto: CreateEscolaDto) {
    const escola = await this.prisma.escola.create({
      data: createEscolaDto
    });

    return {
      message: 'Escola criada com sucesso',
      data: escola
    };
  }

  async findAll() {
    return await this.pagination.paginate({
      model: this.prisma.escola,
      where: {
        deletedAt: null
      },
      page: 1,
      limit: 10,
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

  async findOne(id: number) {
    const escola = await this.prisma.escola.findFirst({
      where: {
        id,
        deletedAt: null
      }
    });

    if (!escola) {
      throw new NotFoundException('Escola não encontrada');
    }

    return {
      message: 'Escola encontrada com sucesso',
      data: escola
    };
  }

  async update(id: number, updateEscolaDto: UpdateEscolaDto) {
    const escola = await this.prisma.escola.findFirst({
      where: {
        id,
        deletedAt: null
      }
    });

    if (!escola) {
      throw new NotFoundException('Escola não encontrada');
    }

    if (Object.keys(updateEscolaDto).length === 0) {
      throw new BadRequestException('Nenhum campo para atualizar');
    }

    const updatedEscola = await this.prisma.escola.update({
      where: {
        id
      },
      data: updateEscolaDto
    });

    return {
      message: 'Escola atualizada com sucesso',
      data: updatedEscola
    };
  }

  async remove(id: number) {
    const escola = await this.prisma.escola.findFirst({
      where: {
        id,
        deletedAt: null
      }
    });

    if(!escola) {
      throw new NotFoundException('Escola não encontrada');
    }

    await this.prisma.escola.update({
      where: {
        id
      },
      data: {
        deletedAt: new Date()
      }
    });

    return {
      message: 'Escola removida com sucesso'
    };
  }
}
