import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RoleScope } from '@prisma/client';
import { TenantRequest } from 'src/common/interfaces/tenant-request.interface';

@Injectable()
export class TenantAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<TenantRequest>();

    if (!req.usuario) {
      throw new UnauthorizedException('Usuário não autenticado');
    }

    if (!req.tenantId) {
      throw new UnauthorizedException('Tenant não resolvido');
    }

    if (req.usuario.roleScope === RoleScope.GLOBAL) {
      return true;
    }

    if (req.usuario.roleScope === RoleScope.TENANT) {
      if (req.usuario.tenantId !== req.tenantId) {
        throw new UnauthorizedException('Acesso negado para esse tenant');
      }
    }

    return true;
  }
}
