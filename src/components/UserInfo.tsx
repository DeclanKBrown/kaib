'use client'

import app from "@/lib/firebase/config"
import { User, getAuth, onAuthStateChanged } from "firebase/auth"
import { doc, getDoc, getFirestore } from "firebase/firestore"
import { useEffect, useState } from "react"
import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'

const db = getFirestore(app)

export default function UserInfo() {
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    const [organisationName, setOrganisationName] = useState<string | null>(null)
    const [userRole, setUserRole] = useState<string | null>(null)

    const auth = getAuth(app)

    useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setCurrentUser(user)
            
            const setOrganisation = async () => {
                const userSnap = await getDoc(doc(db, "user", user.uid))

                setUserRole(userSnap.get('role'))
    
                const organisationSnap = await getDoc(doc(db, 'organisation', userSnap.get('organisationId')))

                setOrganisationName(organisationSnap.get('name'))
            }
            setOrganisation()
        }
    })
    }, [auth])

    return (
        currentUser !== null && organisationName !== null ? (
            <div className="flex w-full items-center">
                <div className="flex w-full items-center gap-2 rounded-lg p-2 text-sm hover:bg-zinc-300">
                    <div className="flex-shrink-0">
                    <div className="flex items-center justify-center overflow-hidden rounded-full">
                        <div className="relative flex">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> 
                        </div>
                    </div>
                    </div>
                    <div className="relative -top-px grow -space-y-px overflow-hidden text-ellipsis text-left text-gray-700">
                        <div className="font-semibold whitespace-nowrap">{currentUser?.displayName}</div>
                        <div className="font-normal">{organisationName + ' ' + userRole}</div>
                    </div>
                </div>
            </div>
        ) : (
            <div className="flex w-full items-center">
                <div className="flex w-full items-center gap-2 rounded-lg p-2 text-sm hover:bg-zinc-300">
                    <div className="flex-shrink-0">
                    <div className="flex items-center justify-center overflow-hidden rounded-full">
                        <div className="relative flex">
                            <Skeleton circle={true} />
                        </div>
                    </div>
                    </div>
                    <div className="relative -top-px grow -space-y-px overflow-hidden text-ellipsis text-left text-gray-700">
                        <Skeleton count={2} />
                    </div>
                </div>
            </div>
        )
    )
}   