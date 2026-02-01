import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationService } from 'src/common/pagination/pagination.service';
import { UploadService } from 'src/common/upload/upload.service';

@Injectable()
export class UsuarioService {
  constructor(
    private readonly prisma: PrismaService,
    private pagination: PaginationService,
    private uploadService: UploadService,
  ) { }

  async create(createUsuarioDto: CreateUsuarioDto, tenantID: number, file: Express.Multer.File) {
    const { roleId, data_nascimento, ...rest } = createUsuarioDto;
    
    const foto_perfil = file ? await this.uploadService.uploadFile(file) : null;

    const usuario = await this.prisma.usuario.create({
      data: {
        tenantId: tenantID,
        foto_perfil: foto_perfil,
        roleId: Number(roleId),
        data_nascimento: new Date(data_nascimento),
        ...rest,
      },
    });

    return {
      message: 'Usuario criado com sucesso',
      data: usuario,
    };
  }

  async findAll(tenantID: number, page: number = 1, limit: number = 10) {
    return this.pagination.paginate({
      model: this.prisma.usuario,
      where: {
        tenantId: tenantID,
        deletedAt: null,
      },
      page,
      limit,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: number, tenantID: number) {
    const usuario = await this.prisma.usuario.findFirst({
      where: {
        id,
        tenantId: tenantID,
        deletedAt: null,
      },
    });

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado para este tenant');
    }

    return {
      message: 'Usuário encontrado com sucesso',
      data: usuario
    };
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto, tenantID: number) {
    const usuario = await this.prisma.usuario.findFirst({
      where: {
        id,
        tenantId: tenantID,
        deletedAt: null,
      },
    });

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado para este tenant');
    }

    if (Object.keys(updateUsuarioDto).length === 0) {
      throw new BadRequestException('Nenhum campo para atualizar');
    }

    const usuarioAtualizado = await this.prisma.usuario.update({
      where: { id: usuario.id },
      data: updateUsuarioDto,
    });

    return {
      message: 'Usuário atualizado com sucesso',
      data: usuarioAtualizado
    };
  }

  async remove(id: number, tenantID: number) {
    const usuario = await this.prisma.usuario.findFirst({
      where: {
        id,
        tenantId: tenantID,
        deletedAt: null,
      },
    });

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado para este tenant');
    }

    await this.prisma.usuario.update({
      where: { id: usuario.id },
      data: { deletedAt: new Date() },
    });

    return {
      message: 'Usuário removido com sucesso',
    };
  }
}
