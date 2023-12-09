import { NextResponse } from "next/server"

import OpenAI from 'openai'
import { modelInstructions } from "@/openai/helpers/model-instructions"

import app from "@/firebase/config" 
import { collection, addDoc, getFirestore } from "firebase/firestore"

// Create an OpenAI API client 
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
})

//Initialize firestore
const db = getFirestore(app)

export async function POST(req: Request) {
    try {
        const formData = await req.formData()

        //Get organisation name
        const organisationName = formData.get('organisationName') as string

        //Create assistant
        const assistant = await openai.beta.assistants.create({
            name: organisationName,
            instructions: modelInstructions,
            tools: [{ type: "retrieval" }],
            model: "gpt-3.5-turbo-1106"
        })

        //Get authenticated user

        //Create organisation and store assistant id
        const docRef = await addDoc(collection(db, "organisation"), {
            assistantId: assistant.id,
            name: organisationName
        })

        //save org id against user

        //Return response
        return NextResponse.json({ message: 'success' }, { status: 201 })

    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}