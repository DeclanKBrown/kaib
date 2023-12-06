import { uploadFirebaseFile } from "@/firebase/functions"
import { uploadAssistantFile } from "@/openai/functions"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        //Get files
        const data = await req.formData()
    
        data.forEach((file) => {
            //Upload to firebase storage
            uploadFirebaseFile(file as File)
        
            //Upload to assistant
            uploadAssistantFile(file as File)
        })
    
        return NextResponse.json({ message: 'Success'}, { status: 200 })
    } catch (error) {
        console.log('upload-file', error)
        return NextResponse.json({ message: 'Failed'}, { status: 403 })
    }
}