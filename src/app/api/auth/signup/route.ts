import { NextResponse } from "next/server"
import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth"
import app from "@/firebase/config"

export async function POST(req: Request) {
    try {
        const formData = await req.formData()
    
        //Get email and password
        const name = formData.get('name') as string
        const email = formData.get('email') as string
        const password = formData.get('password') as string

        //try sign up with firbase
        const auth = getAuth(app)
        const userId = await createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            await updateProfile(userCredential.user, { displayName: name })

            return userCredential.user 
        })

        //Return response
        return NextResponse.json({ message: userId }, { status: 201 })

    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}