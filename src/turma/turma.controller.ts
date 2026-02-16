import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query, UseGuards } from '@nestjs/common';
import { TurmaService } from './turma.service';
import { CreateTurmaDto } from './dto/create-turma.dto';
import { UpdateTurmaDto } from './dto/update-turma.dto';
import type { TenantRequest } from 'src/common/interfaces/tenant-request.interface';
import { ApiBearerAuth, ApiHeader } from '@nestjs/swagger';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query.dto';

@ApiBearerAuth()
@Controller('turma')
export class TurmaController {
  constructor(private readonly turmaService: TurmaService) { }

  @ApiHeader({
    name: 'x-tenant-slug',
    description: 'ID do tenant (escola/empresa) que está fazendo a requisição',
    required: false,
    example: 'escola-alpha',
  })
  @Post()
  create(
    @Body() createTurmaDto: CreateTurmaDto,
    @Req() req: TenantRequest,
  ) {
    return this.turmaService.create(createTurmaDto, req.tenantId);
  }

  @ApiHeader({
    name: 'x-tenant-slug',
    description: 'ID do tenant (escola/empresa) que está fazendo a requisição',
    required: false,
    example: 'escola-alpha',
  })
  @Get()
  findAll(
    @Req() req: TenantRequest,
    @Query() query: PaginationQueryDto
  ) {
    return this.turmaService.findAll(
      req.tenantId,
      query.page,
      query.limit
    );
  }

  @ApiHeader({
    name: 'x-tenant-slug',
    description: 'ID do tenant (escola/empresa) que está fazendo a requisição',
    required: false,
    example: 'escola-alpha',
  })
  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Req() req: TenantRequest,
  ) {
    return this.turmaService.findOne(+id, req.tenantId);
  }

  @ApiHeader({
    name: 'x-tenant-slug',
    description: 'ID do tenant (escola/empresa) que está fazendo a requisição',
    required: false,
    example: 'escola-alpha',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTurmaDto: UpdateTurmaDto,
    @Req() req: TenantRequest
  ) {
    return this.turmaService.update(+id, updateTurmaDto, req.tenantId);
  }

  @ApiHeader({
    name: 'x-tenant-slug',
    description: 'ID do tenant (escola/empresa) que está fazendo a requisição',
    required: false,
    example: 'escola-alpha',
  })
  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Req() req: TenantRequest
  ) {
    return this.turmaService.remove(+id, req.tenantId);
  }
}
