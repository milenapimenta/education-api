import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader } from '@nestjs/swagger';
import { CursoService } from './curso.service';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import type { TenantRequest } from 'src/common/interfaces/tenant-request.interface';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query.dto';

@Controller('curso')
export class CursoController {
  constructor(private readonly cursoService: CursoService) {}

  @ApiHeader({
    name: 'x-tenant-slug',
    description: 'ID do tenant (escola/empresa) que está fazendo a requisição',
    required: true,
    example: 'escola-alpha',
  })
  @ApiBearerAuth('access-token')
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
    required: true,
    example: 'escola-alpha',
  })
  @ApiBearerAuth('access-token')
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
    required: true,
    example: 'escola-alpha',
  })
  @ApiBearerAuth('access-token')
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
    required: true,
    example: 'escola-alpha',
  })
  @ApiBearerAuth('access-token')
  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() updateCursoDto: UpdateCursoDto,
    @Req() req: TenantRequest,
  ) {
    return this.cursoService.update(+id, req.tenantId, updateCursoDto);
  }

  @ApiHeader({
    name: 'x-tenant-slug',
    description: 'ID do tenant (escola/empresa) que está fazendo a requisição',
    required: true,
    example: 'escola-alpha',
  })
  @ApiBearerAuth('access-token')
  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Req() req: TenantRequest,
  ) {
    return this.cursoService.remove(+id, req.tenantId);
  }
}
