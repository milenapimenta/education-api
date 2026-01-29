import { Module } from '@nestjs/common';
import { RespostaService } from './resposta.service';
import { RespostaController } from './resposta.controller';

@Module({
  controllers: [RespostaController],
  providers: [RespostaService],
})
export class RespostaModule {}
