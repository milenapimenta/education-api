import { IsInt, IsNotEmpty, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateTurmaDto {
    @ApiProperty({ example: 3, description: "ID do curso" })
    @IsInt()
    @IsNotEmpty()
    cursoId: number;

    @ApiProperty({ example: "Turma A", minLength: 2 })
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    nome: string;

    @ApiProperty({ example: 2025 })
    @IsInt()
    @IsNotEmpty()
    ano: number;
}
