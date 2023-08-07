import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsObject, IsString } from 'class-validator';

export class ChatGptDTO {
    @ApiProperty()
    @IsString()
    status: string
    @ApiProperty()
    @IsString()
    message: string
}