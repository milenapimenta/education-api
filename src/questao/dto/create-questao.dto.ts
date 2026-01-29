import { IsArray, IsInt, IsNotEmpty, IsString, Min, MinLength } from "class-validator";

export class CreateQuestaoDto {
    @IsInt()
    @IsNotEmpty()
    avaliacaoId: number;

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    texto: string;

    @IsInt()
    @Min(1)
    @IsNotEmpty()
    peso: number;

    @IsArray()
    @IsNotEmpty()
    @IsString({ each: true })
    opcoes: string[];

    @IsNotEmpty()
    @IsString()
    respostaCorreta: string;
}
