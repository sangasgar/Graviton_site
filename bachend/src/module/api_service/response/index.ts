import { IsString } from "class-validator";

export class ChatGptResponse {
    @IsString()
    message: object
}