import { Request } from 'express';
import { AuthUser } from './auth-user.interface';

export interface TenantRequest extends Request {
  tenantId: number;
  tenantSlug: string;
  usuario?: AuthUser;
}
