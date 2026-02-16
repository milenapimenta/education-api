import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { TenantRequest } from 'src/common/interfaces/tenant-request.interface';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector
  ) { }

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const req = context.switchToHttp().getRequest<TenantRequest>();
    const authHeader = req.headers.authorization;
    if (!authHeader) throw new UnauthorizedException('Token não informado');

    const [, token] = authHeader.split(' ');
    if (!token) throw new UnauthorizedException('Token mal formatado');

    try {
      const payload = this.jwtService.verify(token);
      req.usuario = {
        id: payload.sub,
        tenantId: payload.tenantId ?? null,
        role: payload.role,
        roleScope: payload.roleScope,
      };
    } catch {
      throw new UnauthorizedException('Token inválido ou expirado');
    }

    return true;
  }
}
