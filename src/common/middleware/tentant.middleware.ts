import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { TenantRequest } from "../interfaces/tenant-request.interface";

@Injectable()
export class TenantMiddleware implements NestMiddleware {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    async use(req: TenantRequest, res: any, next: () => void) {
        const tenantSlug = req.headers['x-tenant-slug'] as string;

        if (!tenantSlug) {
            throw new UnauthorizedException('Tenant não informado');
        }

        const escola = await this.prisma.escola.findUnique({
            where: {
                slug: tenantSlug
            }
        });

        if (!escola || !escola.ativa) {
            throw new UnauthorizedException('Tenant inválido ou inativo');
        }

        req.tenantId = escola.id;
        req.tenantSlug = escola.slug;

        next();
    }
}