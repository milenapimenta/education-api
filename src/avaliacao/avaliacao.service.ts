import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
    return this.prisma.avaliacao.create({ data: { ...createAvaliacaoDto, tenantId } });
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

  private async findByIdOrFail(id: number, tenantId: number) {
    const avaliacao = await this.prisma.avaliacao.findFirst({ where: { id, tenantId } });

    if (!avaliacao) {
      throw new NotFoundException('Avaliação não encontrada');
    }

    return avaliacao;
  }

  async findOne(id: number, tenantId: number) {
    return this.findByIdOrFail(id, tenantId);
  }

  async update(id: number, updateAvaliacaoDto: UpdateAvaliacaoDto, tenantId: number) {
    const avaliacao = await this.findByIdOrFail(id, tenantId);

    if (Object.keys(updateAvaliacaoDto).length === 0) {
      throw new BadRequestException('Nenhum campo para atualizar');
    }

    return this.prisma.avaliacao.update({ where: { id: avaliacao.id }, data: updateAvaliacaoDto });
  }

  async remove(id: number, tenantId: number) {
    const avaliacao = await this.findByIdOrFail(id, tenantId);

    await this.prisma.avaliacao.delete({ where: { id: avaliacao.id } });

    return null;
  }
}
