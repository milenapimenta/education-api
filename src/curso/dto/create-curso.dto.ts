import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateCursoDto {
    @ApiProperty({ example: "Matemática", minLength: 3 })
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    nome: string;

    @ApiPropertyOptional({ example: "Curso voltado para ensino fundamental" })
    @IsString()
    @IsOptional()
    descricao: string;
}
