import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader } from '@nestjs/swagger';
import { AvaliacaoService } from './avaliacao.service';
import { CreateAvaliacaoDto } from './dto/create-avaliacao.dto';
import { UpdateAvaliacaoDto } from './dto/update-avaliacao.dto';
import type { TenantRequest } from 'src/common/interfaces/tenant-request.interface';

@Controller('avaliacao')
export class AvaliacaoController {
  constructor(private readonly avaliacaoService: AvaliacaoService) {}

  @ApiHeader({
    name: 'x-tenant-slug',
    description: 'ID do tenant (escola/empresa) que está fazendo a requisição',
    required: true,
    example: 'escola-alpha',
  })
  @ApiBearerAuth('access-token')
  @Post()
  create(
    @Body() createAvaliacaoDto: CreateAvaliacaoDto,
    @Req() req: TenantRequest,
  ) {
    return this.avaliacaoService.create(createAvaliacaoDto, req.tenantId);
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
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.avaliacaoService.findAll(req.tenantId, page, limit);
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
    return this.avaliacaoService.findOne(+id, req.tenantId);
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
    @Body() updateAvaliacaoDto: UpdateAvaliacaoDto,
    @Req() req: TenantRequest
  ) {
    return this.avaliacaoService.update(+id, updateAvaliacaoDto, req.tenantId);
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
    @Req() req: TenantRequest
  ) {
    return this.avaliacaoService.remove(+id, req.tenantId);
  }
}
