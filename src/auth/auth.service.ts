import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService
    ) {}

    async login(tenantId: number, email: string, senha: string) {
        const usuario = await this.prisma.usuario.findFirst({
            where: {
                tenantId,
                email
            }
        })

        if (!usuario) {
            throw new Error('Credenciais inválidas')
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha)
        if (!senhaValida) {
            throw new Error('Credenciais inválidas')
        }

        const payload = {
            sub: usuario.id,
            tenantId: usuario.tenantId,
            role: usuario.roleId
        }

        return {
            token: this.jwtService.sign(payload)
        }
    
    }
}