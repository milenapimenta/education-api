import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  IsDateString,
  IsOptional,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUsuarioDto {
  @ApiProperty({ example: 1, description: 'ID do papel (role) do usuário' })
  @IsInt()
  @IsNotEmpty()
  roleId: number;

  @ApiProperty({ example: 'Milena', description: 'Nome completo do usuário' })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiPropertyOptional({ 
    example: 'avatar.png', 
    description: 'Nome do arquivo da foto de perfil (opcional)' 
  })
  @IsString()
  @IsOptional()
  foto_perfil?: string;

  @ApiProperty({ example: 'milena@email.com', description: 'E-mail do usuário' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456', description: 'Senha do usuário' })
  @IsString()
  @IsNotEmpty()
  senha: string;

  @ApiProperty({ example: '123.456.789-00', description: 'Documento do usuário' })
  @IsString()
  @IsNotEmpty()
  documento: string;

  @ApiProperty({ 
    example: '2000-01-01', 
    description: 'Data de nascimento no formato ISO (YYYY-MM-DD)' 
  })
  @IsDateString()
  data_nascimento: string;
}
