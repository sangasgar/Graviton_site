import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { EmailResponse } from './response';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class MailService {
    constructor(private mailerService: MailerService, private readonly config: ConfigService) { }
    async sendLead(dtoEmail): Promise<EmailResponse> {
        await this.mailerService.sendMail({
            to: this.config.get('MAIL_TO'),
            // from: '"Support Team" <support@example.com>', // override default from
            subject: 'Заявка с сайта gravitino.ru',
            template: './leads', // `.hbs` extension is appended automatically
            context: {
                // ✏️ filling curly brackets with content
                name: dtoEmail.name,
                phone: dtoEmail.phone,
                email: dtoEmail.email,
                comment: dtoEmail.comment,
            },
        });
        return { status: true }
    }
}