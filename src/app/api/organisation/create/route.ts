import { NextResponse } from "next/server"

import OpenAI from 'openai'
import { modelInstructions } from "@/lib/openai/helpers/model-instructions"

// Create an OpenAI API client 
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
})

export async function POST(req: Request) {
    try {
        const formData = await req.formData()

        //Get organisation name
        const organisationName = formData.get('organisationName') as string

        // Create assistant
        const assistant = await openai.beta.assistants.create({
            name: organisationName,
            instructions: modelInstructions,
            tools: [{ type: "retrieval" }],
            model: "gpt-3.5-turbo-1106"
        })

        //Return response
        return NextResponse.json({ message: assistant.id }, { status: 201 })

    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}