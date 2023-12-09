'use client'

import Link from "next/link"
import { useRouter } from "next/navigation"
import { FormEvent } from "react"
import toast from "react-hot-toast"

import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import app from "@/lib/firebase/config"

export default function Login() {
    const router = useRouter()

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const formData = new FormData(event.target as HTMLFormElement)

        try {
             //Get email and password
            const email = formData.get('email') as string
            const password = formData.get('password') as string

            //try log in with firbase
            const auth = getAuth(app)
            await signInWithEmailAndPassword(auth, email, password)
    
            toast('Logged in')
            router.push('/')

        } catch (error) {
            console.error('Error logging in:', error)
            toast('Error logging in')
        }
    }

    return (
        <div className="flex min-h-screen w-screen flex-col">
            <header className="flex items-center justify-center pt-10">
                <h1 className="font-mono text-lg select-none">KAIB</h1>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
            </header>
            <main className="flex flex-1 items-center justify-center">
                <div className="flex flex-col">
                    <div className="flex items-center justify-center pt-5 pb-8 px-5">
                        <h1 className="text-center font-semibold text-[32px] leading-[1.2] md:text-32px] md:leading-8 select-none w-[20rem] whitespace-nowrap">Welcome Back</h1>
                    </div>
                    <div className="flex flex-col justify-center pb-3 px-5">
                        <div className="w-full">
                            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                                <input type="email" name="email" className="border border-zinc-300 rounded-md h-12 pl-4 outline-none focus:border-[#3C46FF]" placeholder="email"></input>
                                <input type="password" name="password" className="w-full border border-zinc-300 rounded-md h-12 pl-4 outline-none focus:border-[#3C46FF]" placeholder="password"></input>
                                <button type='submit' className="relative flex h-12 items-center justify-center rounded-md text-center text-base font-medium bg-[#3C46FF] text-[#fff] hover:bg-[#0000FF]">
                                    <div className="relative -top-[1px]">Continue</div>
                                </button>
                            </form>
                        </div>
                        <div className="mt-5 flex justify-center w-full">
                            <p className="text-center text-sm">Don&apos;t have an account? <Link href='/auth/signup' className="text-[#3C46FF]">Sign Up</Link></p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}