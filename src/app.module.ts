import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';
import { RoleModule } from './role/role.module';
import { PaginationModule } from './common/pagination/pagination.module';
import { EscolaModule } from './escola/escola.module';
import { TurmaModule } from './turma/turma.module';
import { CursoModule } from './curso/curso.module';
import { AvaliacaoModule } from './avaliacao/avaliacao.module';
import { QuestaoModule } from './questao/questao.module';
import { RespostaModule } from './resposta/resposta.module';
import { UploadModule } from './common/upload/upload.module';
import { EmailModule } from './email/email.module';

import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { TenantAuthGuard } from './auth/guards/tenant-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'),
      serveRoot: '/public',
    }),

    PrismaModule,
    AuthModule,
    UsuarioModule,
    RoleModule,
    PaginationModule,
    EscolaModule,
    TurmaModule,
    CursoModule,
    AvaliacaoModule,
    QuestaoModule,
    RespostaModule,
    UploadModule,
    EmailModule,

    MailerModule.forRoot({
      transport: {
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: process.env.ETHEREAL_USER,
          pass: process.env.ETHEREAL_PASS,
        },
      },
      defaults: {
        from: '"Minha API" <no-reply@teste.com>',
      },
      template: {
        dir: join(process.cwd(), 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],

  providers: [
    Reflector,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: TenantAuthGuard },
  ],
})
export class AppModule {}
