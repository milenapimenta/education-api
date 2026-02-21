import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { EMAIL_QUEUE } from './queue/email.queue';

@Injectable()
export class EmailProducerService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: EMAIL_QUEUE,
        queueOptions: {
          durable: true,
        },
      },
    });
  }

  async sendEmail(data: any) {
    return this.client.emit('send_email', data);
  }
}