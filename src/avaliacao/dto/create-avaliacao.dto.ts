import { IsDate, IsInt, IsNotEmpty, IsOptional, IsString, Min, MinLength } from "class-validator";

export class CreateAvaliacaoDto {
    @IsInt()
    @IsNotEmpty()
    turmaId: number;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    nome: string;

    @IsString()
    @IsOptional()
    descricao: string;

    @IsDate()
    data: Date;
}
