import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TenantMiddleware } from './common/middleware/tentant.middleware';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
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
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { EmailModule } from './email/email.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

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
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TenantMiddleware)
      .exclude(
        { path: 'public/(.*)', method: RequestMethod.ALL },
        { path: 'escola', method: RequestMethod.ALL }
      )
      .forRoutes('*');
  }
}
