"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { onAuthStateChanged, getAuth } from "firebase/auth"
import app from "../firebase/config"


export default function isAuth(Component: any) {
    return function IsAuth(props: any) {
        const router = useRouter()
        const [verified, setVerified] = useState<boolean>(false)
        const auth = getAuth(app)
        useEffect(() => {
            onAuthStateChanged(auth, user => {
                if (!user) {
                return router.push('/auth')
                }
                setVerified(true)
            })
        }, [])
        if (!verified) {
        return null
        }
        return <Component {...props} />
    }
}
