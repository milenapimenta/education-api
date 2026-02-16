import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TenantRequest } from 'src/common/interfaces/tenant-request.interface';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TenantAuthGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService, private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const req = context.switchToHttp().getRequest<TenantRequest>();

    if (!req.usuario) {
      throw new UnauthorizedException('Usuário não autenticado');
    }

    const isAdminGlobal =
      req.usuario.roleScope === 'GLOBAL' && Number(req.usuario.role) === 1;

    if (!isAdminGlobal) {
      const rawTenantSlug = req.headers['x-tenant-slug'];
      const tenantSlug = Array.isArray(rawTenantSlug) ? rawTenantSlug[0] : rawTenantSlug;

      if (!tenantSlug) {
        throw new UnauthorizedException(
          'Header x-tenant-slug é obrigatório para usuários TENANT',
        );
      }

      const tenant = await this.prisma.escola.findUnique({ where: { slug: tenantSlug } });
      if (!tenant) throw new UnauthorizedException('Tenant não encontrado');

      req.tenantId = tenant.id;

      if (req.usuario.roleScope === 'TENANT' && req.usuario.tenantId !== req.tenantId) {
        throw new UnauthorizedException('Acesso negado para esse tenant');
      }
    }

    return true;
  }
}
