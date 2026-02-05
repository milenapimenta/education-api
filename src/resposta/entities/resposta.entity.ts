import { ApiProperty } from "@nestjs/swagger";

export class Resposta {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 10 })
    questaoId: number;

    @ApiProperty({ example: 5 })
    alunoId: number;

    @ApiProperty({ example: "Brasília" })
    valor: string;

    @ApiProperty({ example: "2025-02-01T10:00:00.000Z" })
    createdAt: Date;
}
