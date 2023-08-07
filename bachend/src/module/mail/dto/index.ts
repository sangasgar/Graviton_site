import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsObject, IsString } from 'class-validator';
export class EmailDTO {
    @ApiProperty()
    @IsString()
    name: string
    @ApiProperty()
    @IsString()
    phone: string
    @ApiProperty()
    @IsString()
    email: string
    @ApiProperty()
    @IsString()
    comment: string
}