import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDate,
  MinLength,
} from 'class-validator';

export class Usuario {
  @IsInt()
  id: number;

  @IsInt()
  tenantId: number;

  @IsInt()
  roleId: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  nome: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  senha: string;

  @IsString()
  @IsNotEmpty()
  documento: string;

  @IsDate()
  data_nascimento: Date;

  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @IsOptional()
  @IsDate()
  updatedAt?: Date;

  @IsOptional()
  @IsDate()
  deletedAt?: Date | null;
}
