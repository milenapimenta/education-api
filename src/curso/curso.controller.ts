import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader } from '@nestjs/swagger';
import { CursoService } from './curso.service';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import type { TenantRequest } from 'src/common/interfaces/tenant-request.interface';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query.dto';

@ApiBearerAuth()
@Controller('curso')
export class CursoController {
  constructor(private readonly cursoService: CursoService) {}

  @ApiHeader({
    name: 'x-tenant-slug',
    description: 'ID do tenant (escola/empresa) que está fazendo a requisição',
    required: false,
    example: 'escola-alpha',
  })
  @Post()
  create(
    @Body() createCursoDto: CreateCursoDto, 
    @Req() req: TenantRequest
  ) {
    return this.cursoService.create(createCursoDto, req.tenantId);
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
    @Query() query : PaginationQueryDto
  ) {
    return this.cursoService.findAll(req.tenantId, query.page, query.limit);
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
    return this.cursoService.findOne(+id, req.tenantId);
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
    @Body() updateCursoDto: UpdateCursoDto,
    @Req() req: TenantRequest,
  ) {
    return this.cursoService.update(+id, updateCursoDto, req.tenantId);
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
    @Req() req: TenantRequest,
  ) {
    return this.cursoService.remove(+id, req.tenantId);
  }
}
