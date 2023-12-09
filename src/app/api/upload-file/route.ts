import { uploadFirebaseFile } from "@/lib/firebase/functions"
import { uploadAssistantFile } from "@/lib/openai/functions"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        //Get files
        const data = await req.formData()
    
        const uploadPromises = Array.from(data).map(async ([fieldName, file]) => {

            // Upload to firebase storage
            await uploadFirebaseFile(file as File)

            // Upload to assistant
            await uploadAssistantFile(file as File)
        })

        // Wait for all promises to resolve
        await Promise.all(uploadPromises)
    
        return NextResponse.json({ message: 'Success'}, { status: 200 })
    } catch (error) {
        console.log('upload-file', error)
        return NextResponse.json({ message: 'Failed'}, { status: 403 })
    }
}