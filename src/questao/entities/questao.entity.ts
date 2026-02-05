import { ApiProperty } from "@nestjs/swagger";

export class Questao {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 5 })
    avaliacaoId: number;

    @ApiProperty({ example: "Qual é a capital do Brasil?" })
    texto: string;

    @ApiProperty({ example: 2 })
    peso: number;

    @ApiProperty({
        example: ["Brasília", "Rio de Janeiro", "São Paulo", "Salvador"],
        type: [String],
    })
    opcoes: string[];

    @ApiProperty({ example: "Brasília" })
    respostaCorreta: string;

    @ApiProperty({ example: "2025-02-01T10:00:00.000Z" })
    createdAt: Date;
}
