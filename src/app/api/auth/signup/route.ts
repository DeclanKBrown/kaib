import { NextResponse } from "next/server"
import { browserSessionPersistence, createUserWithEmailAndPassword, getAuth, setPersistence, updateProfile } from "firebase/auth"
import app from "@/lib/firebase/config"
import { doc, getFirestore, setDoc } from "firebase/firestore"

//Initialize firestore
const db = getFirestore(app)

export async function POST(req: Request) {
    try {
        const formData = await req.formData()
    
        //Get email and password
        const name = formData.get('name') as string
        const email = formData.get('email') as string
        const password = formData.get('password') as string

        //try sign up with firbase
        const auth = getAuth(app)
        setPersistence(auth, browserSessionPersistence)
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)

        // Update user profile
        await updateProfile(userCredential.user, { displayName: name })

        // Create user in Firestore with uid = fireauth uid
        await setDoc(doc(db, "user", userCredential.user.uid), {
            name: name,
            email: email,
            organisationId: null
        })

        //Return response
        return NextResponse.json({ message: userCredential }, { status: 201 })

    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}