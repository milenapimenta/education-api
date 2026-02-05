import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class Curso {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 1 })
    tenantId: number;

    @ApiProperty({ example: "Matemática" })
    nome: string;

    @ApiPropertyOptional({ example: "Curso voltado para ensino fundamental" })
    descricao?: string;

    @ApiProperty({ example: "2025-02-01T10:00:00.000Z" })
    createdAt: Date;

    @ApiProperty({ example: "2025-02-04T10:00:00.000Z" })
    updatedAt: Date;

    @ApiPropertyOptional({ example: null })
    deletedAt?: Date;
}
