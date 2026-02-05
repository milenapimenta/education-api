import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class Turma {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 1 })
    tenantId: number;

    @ApiProperty({ example: 3 })
    cursoId: number;

    @ApiProperty({ example: "Turma A" })
    nome: string;

    @ApiProperty({ example: 2025 })
    ano: number;

    @ApiProperty({ example: "2025-02-01T10:00:00.000Z" })
    createdAt: Date;

    @ApiProperty({ example: "2025-02-04T10:00:00.000Z" })
    updatedAt: Date;

    @ApiPropertyOptional({ example: null })
    deletedAt?: Date;
}
