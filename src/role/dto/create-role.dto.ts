import { IsEnum, IsNotEmpty, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { RoleScope } from "@prisma/client";

export class CreateRoleDto {
    @ApiProperty({ example: "ADMIN", minLength: 2 })
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    nome: string;

    @IsEnum(RoleScope)
    scope: RoleScope;
}
