import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class Avaliacao {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 1 })
    tenantId: number;

    @ApiProperty({ example: 10 })
    turmaId: number;

    @ApiProperty({ example: "Prova Bimestral" })
    nome: string;

    @ApiPropertyOptional({ example: "Avaliação do 2º bimestre" })
    descricao?: string;

    @ApiProperty({ example: "2025-02-10T00:00:00.000Z" })
    data: Date;

    @ApiProperty({ example: "2025-02-01T10:00:00.000Z" })
    createdAt: Date;

    @ApiProperty({ example: "2025-02-04T10:00:00.000Z" })
    updatedAt: Date;
}
