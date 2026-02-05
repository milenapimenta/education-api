import { IsDate, IsInt, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateAvaliacaoDto {
    @ApiProperty({ example: 10, description: "ID da turma" })
    @IsInt()
    @IsNotEmpty()
    turmaId: number;

    @ApiProperty({ example: "Prova Bimestral", minLength: 3 })
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    nome: string;

    @ApiPropertyOptional({ example: "Avaliação referente ao 2º bimestre" })
    @IsString()
    @IsOptional()
    descricao: string;

    @ApiProperty({ example: "2025-02-10T00:00:00.000Z" })
    @IsDate()
    data: Date;
}
