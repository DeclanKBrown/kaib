'use server'

import { modelInstructions } from "@/lib/openai/helpers/model-instructions"
import { openai } from './config'

//Create Assistant
export const createAssistant = async () => {
    try {
        const assistant = await openai.beta.assistants.create({
            name: 'kaib distinct',
            instructions: modelInstructions,
            model: "gpt-3.5-turbo-1106",
            tools: [{"type": "retrieval"}]
        })

        return assistant
    } catch (error) {
        console.log('createAssistant', error)
    }
}

//Upload File
export const uploadAssistantFile = async (file: File) => {
    try {
        //Upload file
        const assistantFile = await openai.files.create({
            file: file,
            purpose: "assistants",
        })
    
        //Attach to assistant
        const response = await openai.beta.assistants.files.create(
            'asst_jbnJAl55xkShiuHRrNUTR3P0',
            {
                file_id: assistantFile.id
            }
        )

        return response
    } catch (error) {
        console.log('uploadAssistantFile', error)
    }
}

//Create thread
export const createThread = async () => {
    try {
        return await openai.beta.threads.create({})
    } catch (error) {
        console.log('createThread', error)
    }
}