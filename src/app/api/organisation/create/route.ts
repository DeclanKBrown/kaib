import { NextResponse } from "next/server"

import OpenAI from 'openai'
import { modelInstructions } from "@/lib/openai/helpers/model-instructions"

import app from "@/lib/firebase/config" 
import { collection, addDoc, getFirestore, updateDoc, doc } from "firebase/firestore"
import { getAuth } from "firebase/auth"

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

        //Get authenticated user
        const auth = getAuth(app)
        const user = auth.currentUser
        
        if (user !== null) {
            // Create assistant
            const assistant = await openai.beta.assistants.create({
                name: organisationName,
                instructions: modelInstructions,
                tools: [{ type: "retrieval" }],
                model: "gpt-3.5-turbo-1106"
            })

            //Create organisation and store assistant id
            const docRef = await addDoc(collection(db, "organisation"), {
                assistantId: assistant.id,
                name: organisationName
            })
            
            //save org id against user
            await updateDoc(doc(db, 'user', user.uid), {
                organisationId: docRef.id
            })
        } else {
            throw new Error('User not authenticated')
        }

        //Return response
        return NextResponse.json({ message: 'success' }, { status: 201 })

    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}