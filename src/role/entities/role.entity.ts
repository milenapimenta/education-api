import { IsDate, IsInt, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class Role {
    @IsInt()
    id: number;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    nome: string;

    @IsInt()
    @IsOptional()
    tenantId: number;

    @IsOptional()
    @IsDate()
    createdAt?: Date;

    @IsOptional()
    @IsDate()
    updatedAt?: Date;
}
