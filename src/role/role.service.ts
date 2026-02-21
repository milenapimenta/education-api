import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createRoleDto: CreateRoleDto, tenantId: number) {
    return this.prisma.role.create({
      data: {
        tenantId,
        ...createRoleDto,
      },
    });
  }

  async findAll(tenantId: number) {
    const roles = await this.prisma.role.findMany({
      where: {
        tenantId: tenantId,
      },
    });

    return roles;
  }

  private async findByIdOrFail(id: number, tenantId: number) {
    const role = await this.prisma.role.findFirst({ where: { id, tenantId } });

    if (!role) {
      throw new NotFoundException('Role não encontrada para este tenant');
    }

    return role;
  }

  async findOne(id: number, tenantId: number) {
    return this.findByIdOrFail(id, tenantId);
  }


  async update(id: number, dto: UpdateRoleDto, tenantId: number) {
    const role = await this.findByIdOrFail(id, tenantId);

    if (Object.keys(dto).length === 0) {
      throw new BadRequestException('Nenhum campo para atualizar');
    }

    return this.prisma.role.update({ where: { id: role.id }, data: dto });
  }

  async remove(id: number, tenantId: number) {
    const role = await this.findByIdOrFail(id, tenantId);

    await this.prisma.role.delete({ where: { id: role.id } });

    return null;
  }
}
