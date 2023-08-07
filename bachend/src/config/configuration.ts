export default () => ({
    port: parseInt(process.env.PORT, 10) || 3001,
    google_translate_api: process.env.GOOGLE_TRANSLATE_API,
    chat_gpt_api_key: process.env.CHAT_GPT_API_KEY,
    chat_gpt_organizathion_key: process.env.CHAT_GPT_ORGANIZATHION_KEY
});