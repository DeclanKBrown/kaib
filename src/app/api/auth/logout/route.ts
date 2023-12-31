import { NextResponse } from "next/server"
import { getAuth, signOut } from "firebase/auth"
import app from "@/lib/firebase/config"

export async function POST(req: Request) {
    try {
        // const formData = await req.formData()

        //try log out with firbase
        const auth = getAuth(app)
        await signOut(auth)

        //Return response
        return NextResponse.json({ message: 'success' }, { status: 201 })

    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}