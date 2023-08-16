import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { EmailResponse } from './response';
@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) { }
    async sendLead(dtoEmail): Promise<EmailResponse> {
        await this.mailerService.sendMail({
            to: 'info@tobuyestate.com',
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