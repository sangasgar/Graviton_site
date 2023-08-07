import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from 'src/config/configuration';
import { ConfigModule } from '@nestjs/config';
import { ApiServiceModule } from '../api_service/api_service.module';
import { MailModule } from '../mail/mail.module';
@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: [configuration]
  }), ApiServiceModule, MailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
