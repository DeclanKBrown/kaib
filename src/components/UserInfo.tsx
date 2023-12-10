'use client'

import app from "@/lib/firebase/config"
import { User, getAuth, onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"

export default function UserInfo() {
    const [currentUser, setCurrentUser] = useState<User | null>(null)

    const auth = getAuth(app)

    useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        setCurrentUser(user)
    })
    }, [auth])

    return (
        currentUser !== null ? (
            <div className="flex w-full items-center">
                <div className="flex w-full items-center gap-2 rounded-lg p-2 text-sm hover:bg-zinc-300">
                    <div className="flex-shrink-0">
                    <div className="flex items-center justify-center overflow-hidden rounded-full">
                        <div className="relative flex">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>                    </div>
                    </div>
                    </div>
                    <div className="relative -top-px grow -space-y-px overflow-hidden text-ellipsis whitespace-nowrap text-left text-gray-700">
                        <div className="font-semibold">{currentUser?.displayName}</div>
                    </div>
                </div>
            </div>
        ) : (
            <></>
        )
    )
}   