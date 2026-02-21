import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {

    private transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: process.env.ETHEREAL_USER,
            pass: process.env.ETHEREAL_PASS,
        }
    });

    async sendMail(to: string, subject: string, body: string) {
        const info = await this.transporter.sendMail({
            from: `"Education API" <${process.env.ETHEREAL_USER}>`,
            to,
            subject,
            html: body,
        });

        console.log('Email enviado com sucesso');
        console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
    }
}