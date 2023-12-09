import { NextResponse } from "next/server"

import app from "@/lib/firebase/config" 
import { getFirestore, updateDoc, doc } from "firebase/firestore"
import { getAuth } from "firebase/auth"

//Initialize firestore
const db = getFirestore(app)

export async function POST(req: Request) {
    try {
        const formData = await req.formData()

        //Get organisation name
        const organisationToken = formData.get('organisationToken') as string

        //Get authenticated user
        const auth = getAuth(app)
        const user = auth.currentUser
        
        if (user !== null) {
            //save org id against user
            await updateDoc(doc(db, 'user', user.uid), {
                organisationId: organisationToken
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