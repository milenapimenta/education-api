import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { TurmaService } from './turma.service';
import { CreateTurmaDto } from './dto/create-turma.dto';
import { UpdateTurmaDto } from './dto/update-turma.dto';
import type { TenantRequest } from 'src/common/interfaces/tenant-request.interface';

@Controller('turma')
export class TurmaController {
  constructor(private readonly turmaService: TurmaService) {}

  @Post()
  create(
    @Body() createTurmaDto: CreateTurmaDto,
    @Req() req: TenantRequest,
  ) {
    return this.turmaService.create(createTurmaDto, req.tenantId);
  }

  @Get()
  findAll(
    @Req() req: TenantRequest,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.turmaService.findAll(req.tenantId, page, limit);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Req() req: TenantRequest,
  ) {
    return this.turmaService.findOne(+id, req.tenantId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() updateTurmaDto: UpdateTurmaDto,
    @Req() req: TenantRequest
  ) {
    return this.turmaService.update(+id, updateTurmaDto, req.tenantId);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Req() req: TenantRequest
  ) {
    return this.turmaService.remove(+id, req.tenantId);
  }
}
