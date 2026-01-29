import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateCursoDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    nome: string;

    @IsString()
    @IsOptional()
    descricao: string;
}
