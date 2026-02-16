import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: "veronica71@yahoo.com" })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "123456" })
  @IsString()
  senha: string;
}
