import { IsInt, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateTurmaDto {
    @IsInt()
    @IsNotEmpty()
    cursoId: number;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    nome: string;

    @IsInt()
    @IsNotEmpty()
    ano: number;
}
