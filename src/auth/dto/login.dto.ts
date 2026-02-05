import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: "mila@gmail.com" })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "12345678" })
  @IsString()
  senha: string;
}
