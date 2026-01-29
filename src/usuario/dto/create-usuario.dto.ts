import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  IsDateString,
} from 'class-validator';

export class CreateUsuarioDto {
  @IsInt()
  @IsNotEmpty()
  roleId: number;

  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  senha: string;

  @IsString()
  @IsNotEmpty()
  documento: string;

  @IsDateString()
  data_nascimento: string;
}
