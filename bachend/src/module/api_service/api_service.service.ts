import { Injectable } from '@nestjs/common';
import { ChatGptDTO } from './dto';
import { Configuration, OpenAIApi } from "openai";
import { ConfigService } from '@nestjs/config';
import { ChatGptResponse } from './response';
import { Storage } from 'src/common/storage/storage';

@Injectable()
export class ApiServiceService {
    constructor(private readonly configService: ConfigService) { }
    async chatGptChange(chatGptDTO: ChatGptDTO): Promise<ChatGptResponse> {
       
        if (chatGptDTO.status == 'new') {
            Storage.setNewArray()
            Storage.pullArray({ "role": "user", "content": chatGptDTO.message }) 
        }
        if (chatGptDTO.status == 'old') {
            Storage.pullArray({ "role": "user", "content": chatGptDTO.message }) 
        }
        const configuration = new Configuration({
            organization: this.configService.get('chat_gpt_organizathion_key'),
            apiKey: this.configService.get('chat_gpt_api_key'),
        });
        const openai = new OpenAIApi(configuration);
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: Storage.getArrayContext(),
        });
        return { message: completion.data.choices[0].message }
    }
}
