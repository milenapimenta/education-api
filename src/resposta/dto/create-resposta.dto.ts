import { IsInt, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateRespostaDto {
    @ApiProperty({ example: 10, description: "ID da questão respondida" })
    @IsInt()
    @IsNotEmpty()
    questaoId: number;

    @ApiProperty({ example: 5, description: "ID do aluno que respondeu" })
    @IsInt()
    @IsNotEmpty()
    alunoId: number;

    @ApiProperty({ example: "Brasília", description: "Resposta dada pelo aluno" })
    @IsString()
    @IsNotEmpty()
    valor: string;
}
