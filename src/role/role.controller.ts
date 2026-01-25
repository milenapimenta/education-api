import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import type { TenantRequest } from 'src/common/interfaces/tenant-request.interface';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  create(
    @Body() createRoleDto: CreateRoleDto,
    @Req() req: TenantRequest
  ) {
    return this.roleService.create(createRoleDto, req.tenantId);
  }

  @Get()
  findAll(@Req() req: TenantRequest) {
    return this.roleService.findAll(req.tenantId);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Req() req: TenantRequest
  ) {
    return this.roleService.findOne(+id, req.tenantId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() updateRoleDto: UpdateRoleDto,
    @Req() req: TenantRequest
  ) {
    return this.roleService.update(+id, updateRoleDto, req.tenantId);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Req() req: TenantRequest
  ) {
    return this.roleService.remove(+id, req.tenantId);
  }
}
