import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService
    ) { }

    async login(tenantId: number | null, email: string, senha: string) {
        const usuario = await this.prisma.usuario.findFirst({
            where: {
                email: email,
                tenantId: tenantId ?? null,
            },
            include: {
                role: true,
            },
        });

        console.log('TenantId recebido no login:', tenantId);

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
            role: usuario.role.id,
            roleScope: usuario.role.scope,
        };

        return {
            token: this.jwtService.sign(payload),
        };
    }
}
