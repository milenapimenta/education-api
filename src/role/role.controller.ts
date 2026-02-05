import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import type { TenantRequest } from 'src/common/interfaces/tenant-request.interface';
import { ApiBearerAuth, ApiHeader } from '@nestjs/swagger';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiHeader({
    name: 'x-tenant-slug',
    description: 'ID do tenant (escola/empresa) que está fazendo a requisição',
    required: true,
    example: 'escola-alpha',
  })
  @ApiBearerAuth('access-token')
  @Post()
  create(
    @Body() createRoleDto: CreateRoleDto,
    @Req() req: TenantRequest
  ) {
    return this.roleService.create(createRoleDto, req.tenantId);
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
    return this.roleService.findAll(req.tenantId);
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
    @Req() req: TenantRequest
  ) {
    return this.roleService.findOne(+id, req.tenantId);
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
    @Body() updateRoleDto: UpdateRoleDto,
    @Req() req: TenantRequest
  ) {
    return this.roleService.update(+id, updateRoleDto, req.tenantId);
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
    return this.roleService.remove(+id, req.tenantId);
  }
}
