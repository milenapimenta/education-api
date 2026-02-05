import { IsBoolean, IsNotEmpty, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateEscolaDto {
    @ApiProperty({ example: "Escola São João", minLength: 3 })
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    nome: string;

    @ApiProperty({ example: "escola-sao-joao" })
    @IsString()
    @IsNotEmpty()
    slug: string;

    @ApiProperty({ example: "12.345.678/0001-99" })
    @IsString()
    @IsNotEmpty()
    cnpj: string;

    @ApiProperty({ example: true })
    @IsBoolean()
    ativa: boolean;
}
