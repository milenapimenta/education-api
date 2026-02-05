import { IsNotEmpty, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto {
    @ApiProperty({ example: "ADMIN", minLength: 2 })
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    nome: string;
}
