export class Usuario {
  id: number;

  tenantId: number;
  roleId: number;

  nome: string;
  foto_perfil?: string;
  email: string;
  senha: string;
  documento: string;
  data_nascimento: Date;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}
