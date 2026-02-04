import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";

@Injectable()
export class EmailService {
    constructor(
        private readonly mailerService: MailerService,
    ) { }

    async enviarBoasVindas(email: string, nome: string): Promise<void> {
        console.log('ENVIANDO PARA:', email);
        console.log('NOME:', nome);
        
        await this.mailerService.sendMail({
            to: email,
            subject: 'Bem-vindo à Nossa Plataforma!',
            template: 'boas-vindas',
            context: {
                nome: nome,
            },
        });
    }
}
