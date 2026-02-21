import { Module } from '@nestjs/common';
import { EmailProducerService } from './email.producer.service';
import { MailService } from './mail.service';
import { EmailConsumer } from './queue/email.consumer';

@Module({
  controllers: [EmailConsumer],
  providers: [
    EmailProducerService,
    MailService,
  ],
  exports: [
    EmailProducerService,
  ],
})
export class EmailModule {}