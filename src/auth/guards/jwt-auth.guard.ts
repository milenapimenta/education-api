import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TenantRequest } from "src/common/interfaces/tenant-request.interface";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    canActivate(context: ExecutionContext) : boolean {
        const req = context.switchToHttp().getRequest<TenantRequest>();

        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new UnauthorizedException('Token não informado')
        }

        const [, token] = authHeader.split(' ');
        if(!token) {
            throw new UnauthorizedException('Token mal formatado')
        }

        try {
            const payload = this.jwtService.verify(token);

            req.usuario = {
                id: payload.sub,
                tenantId: payload.tenantId,
                role: payload.role
            }
        } catch (error) {
            throw new UnauthorizedException('Token inválido ou expirado')
        }

        return true;
    }

}