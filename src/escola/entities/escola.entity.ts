import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class Escola {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: "Escola São João" })
  nome: string;

  @ApiProperty({ example: "escola-sao-joao" })
  slug: string;

  @ApiProperty({ example: true })
  ativa: boolean;

  @ApiProperty({ example: "12.345.678/0001-99" })
  cnpj: string;

  @ApiProperty({ example: "2025-02-01T10:00:00.000Z" })
  createdAt: Date;

  @ApiProperty({ example: "2025-02-04T10:00:00.000Z" })
  updatedAt: Date;

  @ApiPropertyOptional({ example: null })
  deletedAt?: Date;
}
