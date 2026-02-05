import { IsArray, IsInt, IsNotEmpty, IsString, Min, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateQuestaoDto {
    @ApiProperty({ example: 5, description: "ID da avaliação" })
    @IsInt()
    @IsNotEmpty()
    avaliacaoId: number;

    @ApiProperty({ example: "Qual é a capital do Brasil?", minLength: 5 })
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    texto: string;

    @ApiProperty({ example: 2, minimum: 1 })
    @IsInt()
    @Min(1)
    @IsNotEmpty()
    peso: number;

    @ApiProperty({
        example: ["Brasília", "Rio de Janeiro", "São Paulo", "Salvador"],
        type: [String],
    })
    @IsArray()
    @IsNotEmpty()
    @IsString({ each: true })
    opcoes: string[];

    @ApiProperty({ example: "Brasília" })
    @IsNotEmpty()
    @IsString()
    respostaCorreta: string;
}
