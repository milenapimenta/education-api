// src/email/email.controller.ts
import { Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader } from '@nestjs/swagger';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
    constructor(private readonly emailService: EmailService) { }

    @ApiHeader({
        name: 'x-tenant-slug',
        description: 'ID do tenant (escola/empresa) que está fazendo a requisição',
        required: true,
        example: 'escola-alpha',
    })
    @ApiBearerAuth('access-token')
    @Post('test')
    async testarEmail() {
        await this.emailService.enviarBoasVindas(
            'beth.monahan40@ethereal.email',
            'Milena'
        );

        return { message: 'Email enviado (teste)' };
    }
}
