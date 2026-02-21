import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationService } from 'src/common/pagination/pagination.service';

@Injectable()
export class CursoService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly pagination: PaginationService
  ) {}

  async create(createCursoDto: CreateCursoDto, tenantId: number) {
    return this.prisma.curso.create({
      data: {
        ...createCursoDto,
        tenantId,
      },
    });
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
  
  private async findByIdOrFail(id: number, tenantId: number) {
    const curso = await this.prisma.curso.findFirst({ where: { id, tenantId, deletedAt: null } });
    
    if (!curso) {
      throw new NotFoundException('Curso não encontrado para este tenant');
    }
    
    return curso;
  }

  async findOne(id: number, tenantId: number) {
    return this.findByIdOrFail(id, tenantId);
  }

  async update(id: number, updateCursoDto: UpdateCursoDto, tenantId: number) {
    const curso = await this.findByIdOrFail(id, tenantId);
    
    if (Object.keys(updateCursoDto).length === 0) {
      throw new BadRequestException('Nenhum campo para atualizar');
    }
    
    return this.prisma.curso.update({ where: { id: curso.id }, data: updateCursoDto });
  }

  async remove(id: number, tenantId: number) {
    const curso = await this.findByIdOrFail(id, tenantId);
    
    await this.prisma.curso.update({ where: { id: curso.id }, data: { deletedAt: new Date() } });
    
    return null;
  }
}
