import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { RespostaService } from './resposta.service';
import { CreateRespostaDto } from './dto/create-resposta.dto';
import { UpdateRespostaDto } from './dto/update-resposta.dto';
import { ApiBearerAuth, ApiHeader } from '@nestjs/swagger';
import type { TenantRequest } from 'src/common/interfaces/tenant-request.interface';

@Controller('resposta')
export class RespostaController {
  constructor(private readonly respostaService: RespostaService) {}

  @ApiHeader({
    name: 'x-tenant-slug',
    description: 'ID do tenant (escola/empresa) que está fazendo a requisição',
    required: true,
    example: 'escola-alpha',
  })
  @ApiBearerAuth('access-token')
  @Post()
  create(@Body() createRespostaDto: CreateRespostaDto, @Req() req: TenantRequest) {
    return this.respostaService.create(createRespostaDto);
  }

  @ApiHeader({
    name: 'x-tenant-slug',
    description: 'ID do tenant (escola/empresa) que está fazendo a requisição',
    required: true,
    example: 'escola-alpha',
  })
  @ApiBearerAuth('access-token')
  @Get()
  findAll(@Req() req: TenantRequest) {
    return this.respostaService.findAll();
  }

  @ApiHeader({
    name: 'x-tenant-slug',
    description: 'ID do tenant (escola/empresa) que está fazendo a requisição',
    required: true,
    example: 'escola-alpha',
  })
  @ApiBearerAuth('access-token')
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: TenantRequest) {
    return this.respostaService.findOne(+id);
  }

  @ApiHeader({
    name: 'x-tenant-slug',
    description: 'ID do tenant (escola/empresa) que está fazendo a requisição',
    required: true,
    example: 'escola-alpha',
  })
  @ApiBearerAuth('access-token')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRespostaDto: UpdateRespostaDto, @Req() req: TenantRequest) {
    return this.respostaService.update(+id, updateRespostaDto);
  }

  @ApiHeader({
    name: 'x-tenant-slug',
    description: 'ID do tenant (escola/empresa) que está fazendo a requisição',
    required: true,
    example: 'escola-alpha',
  })
  @ApiBearerAuth('access-token')
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: TenantRequest) {
    return this.respostaService.remove(+id);
  }
}
