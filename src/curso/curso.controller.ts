import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { CursoService } from './curso.service';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import type { TenantRequest } from 'src/common/interfaces/tenant-request.interface';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query.dto';

@Controller('curso')
export class CursoController {
  constructor(private readonly cursoService: CursoService) {}

  @Post()
  create(
    @Body() createCursoDto: CreateCursoDto, 
    @Req() req: TenantRequest
  ) {
    return this.cursoService.create(createCursoDto, req.tenantId);
  }

  @Get()
  findAll(
    @Req() req: TenantRequest,
    @Query() query : PaginationQueryDto
  ) {
    return this.cursoService.findAll(req.tenantId, query.page, query.limit);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Req() req: TenantRequest,
  ) {
    return this.cursoService.findOne(+id, req.tenantId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() updateCursoDto: UpdateCursoDto,
    @Req() req: TenantRequest,
  ) {
    return this.cursoService.update(+id, req.tenantId, updateCursoDto);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Req() req: TenantRequest,
  ) {
    return this.cursoService.remove(+id, req.tenantId);
  }
}
