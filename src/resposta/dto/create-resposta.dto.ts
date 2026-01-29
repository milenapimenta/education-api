import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateRespostaDto {
    @IsInt()
    @IsNotEmpty()
    questaoId: number;

    @IsInt()
    @IsNotEmpty()
    alunoId: number;

    @IsString()
    @IsNotEmpty()
    valor: string;
}
