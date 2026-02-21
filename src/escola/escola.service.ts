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
    return this.prisma.escola.create({
      data: createEscolaDto,
    });
  }

  async findAll(page: number = 1, limit: number = 10) {
    return await this.pagination.paginate({
      model: this.prisma.escola,
      where: {
        deletedAt: null
      },
      page: page,
      limit: limit,
      orderBy: {
        createdAt: 'desc'
      }
    })
  }
  
  private async findByIdOrFail(id: number) {
    const escola = await this.prisma.escola.findFirst({ where: { id, deletedAt: null } });
    
    if (!escola) {
      throw new NotFoundException('Escola não encontrada');
    }
    
    return escola;
  }

  async findOne(id: number) {
    const escola = await this.findByIdOrFail(id);
  }

  async update(id: number, updateEscolaDto: UpdateEscolaDto) {
    const escola = await this.findByIdOrFail(id);
    
    if (Object.keys(updateEscolaDto).length === 0) {
      throw new BadRequestException('Nenhum campo para atualizar');
    }
    
    return this.prisma.escola.update({ where: { id }, data: updateEscolaDto });
  }

  async remove(id: number) {
    const escola = await this.findByIdOrFail(id);
    
    await this.prisma.escola.update({ where: { id }, data: { deletedAt: new Date() } });
    
    return null;
  }
}
