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

    async login(email: string, senha: string, tenantSlug?: string) {
        let tenantId: number | null = null;

        if (tenantSlug) {
            const tenant = await this.prisma.escola.findUnique({
                where: { slug: tenantSlug },
            });
            if (!tenant) throw new UnauthorizedException('Tenant não encontrado');
            tenantId = tenant.id;
        }

        const usuario = await this.prisma.usuario.findFirst({
            where: {
                email,
                tenantId: tenantId ?? null, // <- aqui garante null para admin/global
            },
            include: { role: true },
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
            role: usuario.role.id,
            roleNome: usuario.role.nome,
            roleScope: usuario.role.scope,
        };

        return { token: this.jwtService.sign(payload) };
    }
}