import { RoleScope } from "@prisma/client";

export interface AuthUser {
  id: number;
  tenantId: number | null;
  role: string;
  roleScope: RoleScope;
}
