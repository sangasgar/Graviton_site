import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ChatGptResponse {
    @ApiProperty()
    @IsString()
    user_id: string
    @ApiProperty()
    @IsString()
    message: object
}