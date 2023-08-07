import { Injectable } from '@nestjs/common';
import { ChatGptDTO } from './dto';
import { Configuration, OpenAIApi } from "openai";
import { ConfigService } from '@nestjs/config';
import { ChatGptResponse } from './response'
@Injectable()
export class ApiServiceService {
    constructor(private readonly configService: ConfigService): Promise<ChatGptResponse> { }
    async chatGptChange(chatGptDTO: ChatGptDTO) {
        let chatGptMessage = []
        if (chatGptDTO.status == 'new') {
            chatGptMessage = [{ "role": "user", "content": chatGptDTO.message }]
        }
        if (chatGptDTO.status == 'old') {
            chatGptMessage.push({ "role": "user", "content": chatGptDTO.message })
        }
        const configuration = new Configuration({
            organization: this.configService.get('chat_gpt_organizathion_key'),
            apiKey: this.configService.get('chat_gpt_api_key'),
        });
        const openai = new OpenAIApi(configuration);
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: chatGptMessage,
        });
        console.log(completion)
        return { message: completion.data.choices[0].message }
    }
}
