export class Usuario {
  id: number;

  tenantId: number;
  roleId: number;

  nome: string;
  email: string;
  senha: string;
  documento: string;
  data_nascimento: Date;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}
