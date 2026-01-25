import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import type { TenantRequest } from 'src/common/interfaces/tenant-request.interface';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query.dto';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  create(
    @Body() createUsuarioDto: CreateUsuarioDto,
    @Req() req: TenantRequest
  ) {
    return this.usuarioService.create(createUsuarioDto, req.tenantId);
  }

  @Get()
  findAll(
    @Req() req: TenantRequest,
    @Query() query : PaginationQueryDto
  ) {
    return this.usuarioService.findAll(
      req.tenantId,
      query.page,
      query.limit
    );
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Req() req: TenantRequest
  ) {
    return this.usuarioService.findOne(+id, req.tenantId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() updateUsuarioDto: UpdateUsuarioDto,
    @Req() req: TenantRequest
  ) {
    return this.usuarioService.update(+id, updateUsuarioDto, req.tenantId);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Req() req: TenantRequest
  ) {
    return this.usuarioService.remove(+id, req.tenantId);
  }
}
