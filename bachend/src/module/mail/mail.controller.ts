import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { EmailDTO } from './dto';
import { EmailResponse } from './response';

@Controller('mail')
export class MailController {
    constructor(private readonly mailService: MailService) { }
    @ApiResponse({ status: 200 })
    @ApiTags('Mail')
    @Post()
    sendMail(@Body() email: EmailDTO): Promise<EmailResponse> {
        return this.mailService.sendLead(email)
    }

}
