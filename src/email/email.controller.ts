import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader } from '@nestjs/swagger';
import { EmailService } from './email.service';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { TenantAuthGuard } from 'src/auth/guards/tenant-auth.guard';

@UseGuards(JwtAuthGuard, TenantAuthGuard)
@ApiBearerAuth()
@Controller('email')
export class EmailController {
    constructor(private readonly emailService: EmailService) { }

    @ApiHeader({
        name: 'x-tenant-slug',
        description: 'ID do tenant (escola/empresa) que está fazendo a requisição',
        required: true,
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
