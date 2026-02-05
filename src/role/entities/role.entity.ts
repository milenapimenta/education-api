import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class Role {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: "ADMIN" })
    nome: string;

    @ApiProperty({ example: 1 })
    tenantId: number;

    @ApiPropertyOptional({ example: "2025-02-01T10:00:00.000Z" })
    createdAt?: Date;

    @ApiPropertyOptional({ example: "2025-02-04T10:00:00.000Z" })
    updatedAt?: Date;
}
