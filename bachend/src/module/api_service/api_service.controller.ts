import { Controller, HttpException, Post, HttpStatus } from '@nestjs/common';
import { ApiServiceService } from './api_service.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body } from '@nestjs/common';
import { ChatGptDTO } from './dto';
import { AppError } from 'src/common/constant/errors';
@Controller('api-service')
export class ApiServiceController {
    constructor(private readonly apiServiceService: ApiServiceService): Promise<ChatGptResponse> { }
    @ApiTags('Service Api')
    @ApiResponse({ status: 200 })
    @Post()
    chatGptChange(@Body() chatGptDTO: ChatGptDTO) {
        if (!chatGptDTO.status && !chatGptDTO.message) throw new HttpException(AppError.MESSAGE_NOT_FOUND, HttpStatus.NOT_FOUND)
        return this.apiServiceService.chatGptChange(chatGptDTO)
    }
}
