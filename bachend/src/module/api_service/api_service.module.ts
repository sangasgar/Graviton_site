import { Module } from '@nestjs/common';
import { ApiServiceController } from './api_service.controller';
import { ApiServiceService } from './api_service.service';

@Module({
  controllers: [ApiServiceController],
  providers: [ApiServiceService]
})
export class ApiServiceModule { }
