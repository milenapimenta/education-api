import { IsBoolean, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateEscolaDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    nome: string;

    @IsString()
    @IsNotEmpty()
    slug: string;

    @IsString()
    @IsNotEmpty()
    cnpj: string;

    @IsBoolean()
    ativa: boolean;
}
