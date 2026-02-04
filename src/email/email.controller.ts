// src/email/email.controller.ts
import { Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
    constructor(private readonly emailService: EmailService) { }

    @Post('test')
    async testarEmail() {
        await this.emailService.enviarBoasVindas(
            'beth.monahan40@ethereal.email',
            'Milena'
        );

        return { message: 'Email enviado (teste)' };
    }
}
