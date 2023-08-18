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
            Storage.setNewArray(chatGptDTO.user_id)
            Storage.pullArray(chatGptDTO.user_id, [{ "role": "user", "content": chatGptDTO.message }])
        }
        if (chatGptDTO.status == 'old') {
            const array = Storage.getArrayContext(chatGptDTO.user_id)
            if (array) {
                array.push({ "role": "user", "content": chatGptDTO.message })
                Storage.pullArray(chatGptDTO.user_id, array)
            } else {
                Storage.setNewArray(chatGptDTO.user_id)
            }
        }
        const configuration = new Configuration({
            organization: this.configService.get('chat_gpt_organizathion_key'),
            apiKey: this.configService.get('chat_gpt_api_key'),
        });
        const openai = new OpenAIApi(configuration);
        const context = Storage.getArrayContext(chatGptDTO.user_id)
        console.log(context)
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: context,
        });
        return { user_id: chatGptDTO.user_id, message: completion.data.choices[0].message }
    }
}
