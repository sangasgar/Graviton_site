import { IsBoolean } from "class-validator";

export class EmailResponse {
    @IsBoolean()
    status: boolean
}