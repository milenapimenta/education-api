import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { MailService } from 'src/email/mail.service';

@Controller()
export class EmailConsumer {

  constructor(private readonly mailService: MailService) {}

  @EventPattern('send_email')
  async handleSendEmail(@Payload() data: any) {

    console.log('Email recebido da fila:', data);

    await this.mailService.sendMail(
      data.to,
      data.subject,
      data.body,
    );

  }

}