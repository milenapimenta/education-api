import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Usuario {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  tenantId: number;

  @ApiProperty({ example: 2 })
  roleId: number;

  @ApiProperty({ example: 'Milena' })
  nome: string;

  @ApiPropertyOptional({ example: 'avatar.png' })
  foto_perfil?: string;

  @ApiProperty({ example: 'milena@email.com' })
  email: string;

  @ApiProperty({ example: '********' })
  senha: string;

  @ApiProperty({ example: '123.456.789-00' })
  documento: string;

  @ApiProperty({ example: '2000-01-01T00:00:00.000Z' })
  data_nascimento: Date;

  @ApiPropertyOptional({ example: '2025-02-04T12:00:00.000Z' })
  createdAt?: Date;

  @ApiPropertyOptional({ example: '2025-02-04T12:00:00.000Z' })
  updatedAt?: Date;

  @ApiPropertyOptional({ example: null })
  deletedAt?: Date | null;
}
