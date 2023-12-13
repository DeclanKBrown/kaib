import { NextResponse } from "next/server"
import { openai } from "@/lib/openai/config"

export async function POST(req: Request) {
    try {
        //Get files
        const data = await req.formData()

        //Get files 
        const files: File[] = data.getAll('file') as File[]

        //get assistant id
        const assistantId: string = data.get('assistantId') as string
    
        //Iterate through files an upload
        const uploadPromises = files.map(async (file) => {
            //Upload file
            const assistantFile = await openai.files.create({
                file: file,
                purpose: "assistants",
            })

            //Attach to assistant
            await openai.beta.assistants.files.create(
                assistantId,
                {
                    file_id: assistantFile.id
                }
            )
        })

        // Wait for all promises to resolve
        await Promise.all(uploadPromises)
    
        return NextResponse.json({ message: 'Success'}, { status: 200 })
    } catch (error) {
        console.log('upload-file', error)
        return NextResponse.json({ message: 'Failed'}, { status: 403 })
    }
}