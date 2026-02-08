import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "src/common/decorators/role.decorator";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private prisma: PrismaService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredRoles) return true;

        const req = context.switchToHttp().getRequest();
        const usuario = req.usuario;

        if (!usuario) {
            throw new ForbiddenException('Usuário não autenticado');
        }

        if (!req.usuario?.role) {
            throw new ForbiddenException('Role do usuário não encontrada no token');
        }

        const role = await this.prisma.role.findUnique({
            where: {
                id: Number(req.usuario.role),
            },
        });

        if (!role) {
            throw new ForbiddenException('Papel do usuário não encontrado');
        }

        if (
            !requiredRoles
                .map(r => r.toUpperCase())
                .includes(role.nome.toUpperCase())
        ) {
            throw new ForbiddenException('Acesso negado: você não tem permissão');
        }

        return true;
    }
}
