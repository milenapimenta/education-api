import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader } from '@nestjs/swagger';
import { EmailService } from './email.service';

@ApiBearerAuth()
@Controller('email')
export class EmailController {
    constructor(private readonly emailService: EmailService) { }

    @ApiHeader({
        name: 'x-tenant-slug',
        description: 'ID do tenant (escola/empresa) que está fazendo a requisição',
        required: false,
        example: 'escola-alpha',
    })
    @Post('test')
    async testarEmail() {
        await this.emailService.enviarBoasVindas(
            'beth.monahan40@ethereal.email',
            'Milena'
        );

        return { message: 'Email enviado (teste)' };
    }
}
