import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { AvaliacaoService } from './avaliacao.service';
import { CreateAvaliacaoDto } from './dto/create-avaliacao.dto';
import { UpdateAvaliacaoDto } from './dto/update-avaliacao.dto';
import type { TenantRequest } from 'src/common/interfaces/tenant-request.interface';

@Controller('avaliacao')
export class AvaliacaoController {
  constructor(private readonly avaliacaoService: AvaliacaoService) {}

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
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.avaliacaoService.findAll(req.tenantId, page, limit);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Req() req: TenantRequest,
  ) {
    return this.avaliacaoService.findOne(+id, req.tenantId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() updateAvaliacaoDto: UpdateAvaliacaoDto,
    @Req() req: TenantRequest
  ) {
    return this.avaliacaoService.update(+id, updateAvaliacaoDto, req.tenantId);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Req() req: TenantRequest
  ) {
    return this.avaliacaoService.remove(+id, req.tenantId);
  }
}
