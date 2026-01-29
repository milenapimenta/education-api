export class Avaliacao {
    id: number;
    
    tenantId: number;
    turmaId: number;

    nome: string;
    descricao?: string;
    data: Date;
    
    createdAt: Date;
    updatedAt: Date;
}
