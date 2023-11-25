import { Configuration, OpenAIApi } from "openai-edge"
import { OpenAIStream, StreamingTextResponse } from "ai"

export const runtime = 'edge'

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(config)

export async function POST(req: Request) {
    const { messages } = await req.json()

    try {
        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            stream: true,
            messages: [
                { role: 'system', content: 'Act like you normally do' },
                ...messages
            ]
        })

        const stream = await OpenAIStream(response)

        return new StreamingTextResponse(stream)

    } catch (error) {
        console.error(error)
    }

}