import { NextResponse } from "next/server"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import app from "@/firebase/config"

export async function POST(req: Request) {
    try {
        const formData = await req.formData()
    
        //Get email and password
        const email = formData.get('email') as string
        const password = formData.get('password') as string

        //try log in with firbase
        const auth = getAuth(app)
        const userId = await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            return userCredential.user 
        })

        //Return response
        return NextResponse.json({ message: userId }, { status: 201 })

    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}