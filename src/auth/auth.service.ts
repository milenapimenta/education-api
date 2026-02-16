import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from 'bcrypt';
import { RoleScope } from "@prisma/client";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService
    ) { }

    async login(tenantId: number | null, email: string, senha: string) {
        const usuario = await this.prisma.usuario.findFirst({
            where: {
                email,
                OR: [
                    { tenantId },
                    { tenantId: null }
                ]
            },
            include: {
                role: true,
            },
        });

        if (!usuario) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const payload = {
            sub: usuario.id,
            tenantId: usuario.tenantId,
            role: usuario.role.nome,
            roleScope: usuario.role.scope as RoleScope,
        };

        return {
            token: this.jwtService.sign(payload),
        };
    }
}
