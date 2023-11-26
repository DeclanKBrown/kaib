import OpenAI from "openai"

import { modelInstructions } from "@/app/helpers/model-instructions"

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

export async function POST(req: Request, res: Response) {
    const assistant = await openai.beta.assistants.create({
        name: 'kaib distinct',
        instructions: modelInstructions,
        model: "gpt-3.5-turbo-1106",
        tools: [{"type": "retrieval"}]
    })

    return res.status(200).send('success')
}