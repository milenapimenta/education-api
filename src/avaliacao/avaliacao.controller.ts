import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader } from '@nestjs/swagger';
import { AvaliacaoService } from './avaliacao.service';
import { CreateAvaliacaoDto } from './dto/create-avaliacao.dto';
import { UpdateAvaliacaoDto } from './dto/update-avaliacao.dto';
import type { TenantRequest } from 'src/common/interfaces/tenant-request.interface';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query.dto';

@ApiBearerAuth()
@Controller('avaliacao')
export class AvaliacaoController {
  constructor(private readonly avaliacaoService: AvaliacaoService) { }

  @ApiHeader({
    name: 'x-tenant-slug',
    description: 'ID do tenant (escola/empresa) que está fazendo a requisição',
    required: false,
    example: 'escola-alpha',
  })
  @Post()
  create(
    @Body() createAvaliacaoDto: CreateAvaliacaoDto,
    @Req() req: TenantRequest,
  ) {
    return this.avaliacaoService.create(createAvaliacaoDto, req.tenantId);
  }

  @Get()
  findAll(
    @Req() req: TenantRequest,
    @Query() query: PaginationQueryDto
  ) {
    return this.avaliacaoService.findAll(
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
    return this.avaliacaoService.findOne(+id, req.tenantId);
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
    @Body() updateAvaliacaoDto: UpdateAvaliacaoDto,
    @Req() req: TenantRequest
  ) {
    return this.avaliacaoService.update(+id, updateAvaliacaoDto, req.tenantId);
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
    return this.avaliacaoService.remove(+id, req.tenantId);
  }
}
