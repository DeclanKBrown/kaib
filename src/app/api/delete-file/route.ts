import { NextResponse } from "next/server"
import { openai } from "@/lib/openai/config"

export async function POST(req: Request) {
    try {
        const { fileId, assistantId } = await req.json()

        await openai.beta.assistants.files.del(
            assistantId,
            fileId
        )

        await openai.files.del(fileId)

        return NextResponse.json({ message: 'Success'}, { status: 200 })
    } catch (error) {
        console.log('delete-file', error)
        return NextResponse.json({ message: 'Failed'}, { status: 403 })
    }
}