import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTurmaDto } from './dto/create-turma.dto';
import { UpdateTurmaDto } from './dto/update-turma.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationService } from 'src/common/pagination/pagination.service';

@Injectable()
export class TurmaService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly pagination: PaginationService,
  ) { }

  async create(createTurmaDto: CreateTurmaDto, tenantId: number) {
    return this.prisma.turma.create({
      data: {
        ...createTurmaDto,
        tenantId,
      },
    });
  }

  async findAll(tenantId: number, page: number = 1, limit: number = 10) {
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

  private async findByIdOrFail(id: number, tenantId: number) {
    const turma = await this.prisma.turma.findFirst({ where: { id, tenantId, deletedAt: null } });

    if (!turma) {
      throw new NotFoundException('Turma não encontrada');
    }

    return turma;
  }

  async findOne(id: number, tenantId: number) {
    return this.findByIdOrFail(id, tenantId);
  }

  async update(id: number, updateTurmaDto: UpdateTurmaDto, tenantId: number) {
    const turma = await this.findByIdOrFail(id, tenantId);

    if (Object.keys(updateTurmaDto).length === 0) {
      throw new BadRequestException('Nenhum campo para atualizar');
    }

    return this.prisma.turma.update({ where: { id: turma.id }, data: updateTurmaDto });
  }

  async remove(id: number, tenantId: number) {
    const turma = await this.findByIdOrFail(id, tenantId);

    await this.prisma.turma.update({ where: { id: turma.id }, data: { deletedAt: new Date() } });

    return null;
  }
}
