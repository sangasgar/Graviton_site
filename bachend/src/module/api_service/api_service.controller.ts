import { Controller, HttpException, Post, HttpStatus } from '@nestjs/common';
import { ApiServiceService } from './api_service.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body } from '@nestjs/common';
import { ChatGptDTO } from './dto';
import { AppError } from 'src/common/constant/errors';
import { ChatGptResponse } from './response';
@Controller('api-service')
export class ApiServiceController {
    constructor(private readonly apiServiceService: ApiServiceService) { }
    @ApiTags('Service Api')
    @ApiResponse({ status: 200 })
    @Post()
    chatGptChange(@Body() chatGptDTO: ChatGptDTO): Promise<ChatGptResponse> {
        if (!chatGptDTO.status && !chatGptDTO.message) throw new HttpException(AppError.MESSAGE_NOT_FOUND, HttpStatus.NOT_FOUND)
        return this.apiServiceService.chatGptChange(chatGptDTO)
    }
}
