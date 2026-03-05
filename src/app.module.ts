import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { APP_GUARD, Reflector } from '@nestjs/core';

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

import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { TenantAuthGuard } from './auth/guards/tenant-auth.guard';
import { EmailModule } from './email/email.module';
import { RedisService } from './common/redis/redis.service';
import { RedisThrottlerGuard } from './common/redis/redis-throttler.guard';
import { RedisModule } from './common/redis/redis.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'),
      serveRoot: '/public',
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60,
          limit: 20,
        },
      ]
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
    RedisModule,
  ],

  providers: [
    RedisService,
    Reflector,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: TenantAuthGuard },
    { provide: APP_GUARD, useClass: RedisThrottlerGuard },
  ],
})
export class AppModule { }
