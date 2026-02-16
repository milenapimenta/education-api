import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, UseGuards } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import type { TenantRequest } from 'src/common/interfaces/tenant-request.interface';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'multer.config';
import { ImageMimeTypeValidator } from 'src/validators/image-mimetype.validator';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiHeader, ApiOperation, ApiParam } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) { }

  @ApiHeader({
    name: 'x-tenant-slug',
    description: 'ID do tenant (escola/empresa) que está fazendo a requisição',
    required: false,
    example: 'escola-alpha',
  })
  @Post()
  @UseInterceptors(FileInterceptor('foto_perfil', multerConfig))
  create(
    @Body() createUsuarioDto: CreateUsuarioDto,
    @Req() req: TenantRequest,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5MB
          new ImageMimeTypeValidator(),
        ],
      })
    ) file: Express.Multer.File,
  ) {
    return this.usuarioService.create(createUsuarioDto, req.tenantId, file);
  }

  @ApiHeader({
    name: 'x-tenant-slug',
    description: 'ID do tenant (escola/empresa) que está fazendo a requisição',
    required: false,
    example: 'escola-alpha',
  })
  @Get()
  findAll(
    @Req() req: TenantRequest,
    @Query() query: PaginationQueryDto
  ) {
    return this.usuarioService.findAll(
      req.tenantId,
      query.page,
      query.limit
    );
  }

  @ApiHeader({
    name: 'x-tenant-slug',
    description: 'ID do tenant (escola/empresa) que está fazendo a requisição',
    required: false,
    example: 'escola-alpha',
  })
  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Req() req: TenantRequest
  ) {
    return this.usuarioService.findOne(+id, req.tenantId);
  }

  @ApiHeader({
    name: 'x-tenant-slug',
    description: 'ID do tenant (escola/empresa) que está fazendo a requisição',
    required: false,
    example: 'escola-alpha',
  })
  @Patch(':id')
  @UseInterceptors(FileInterceptor('foto_perfil', multerConfig))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Atualizar usuário' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        roleId: { type: 'number' },
        nome: { type: 'string' },
        email: { type: 'string' },
        senha: { type: 'string' },
        documento: { type: 'string' },
        data_nascimento: { type: 'string', format: 'date' },
        foto_perfil: { type: 'string', format: 'binary' },
      },
    },
  })
  update(
    @Param('id') id: string,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: TenantRequest
  ) {
    return this.usuarioService.update(+id, updateUsuarioDto, req.tenantId, file);
  }

  @ApiHeader({
    name: 'x-tenant-slug',
    description: 'ID do tenant (escola/empresa) que está fazendo a requisição',
    required: false,
    example: 'escola-alpha',
  })
  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Req() req: TenantRequest
  ) {
    return this.usuarioService.remove(+id, req.tenantId);
  }
}
