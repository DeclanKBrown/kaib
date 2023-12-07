'use client'

import Link from "next/link"

export default function Auth() {

    return (
        <div className="flex min-h-full w-screen flex-col sm:supports-[min-height:100dvh]:min-h-[100dvh] md:grid md:grid-cols-2 lg:grid-cols-[60%_40%]">
            <div className="relative hidden flex-1 flex-col justify-center px-5 pt-8 bg-zinc-300 md:flex md:px-6 md:py-[22px] lg:px-8">
                <div className="left-0 top-8 flex w-full px-6 sm:absolute md:top-[22px] md:px-6 lg:px-8">
                    <h1 className="font-mono text-lg select-none">KAIB</h1>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                </div>
                <div className="flex items-center justify-center">
                    <h1 className="text-center text-[20px] leading-[1.2] md:text-[32px] md:leading-8 select-none">Knowledge Base AI</h1>
                </div>
            </div>
            <div className="relative flex grow flex-col items-center justify-between bg-white px-5 py-8 text-black dark:bg-black dark:text-white sm:rounded-t-[30px] md:rounded-none md:px-6">
                <div className="relative flex w-full grow flex-col items-center justify-center">
                    <h2 className="text-center text-[20px] leading-[1.2] md:text-[32px] md:leading-8 select-none">Get started</h2>
                    <div className="mt-5 w-full max-w-[440px]">
                        <div className="grid gap-x-3 gap-y-2 sm:grid-cols-2 sm:gap-y-0">
                            <Link href="/auth/login" className="relative flex h-12 items-center justify-center rounded-md text-center text-base font-medium bg-[#3C46FF] text-[#fff] hover:bg-[#0000FF]">
                                <div className="relative -top-[1px]">Log in</div>
                            </Link>
                            <Link href="/auth/signup" className="relative flex h-12 items-center justify-center rounded-md text-center text-base font-medium bg-[#3C46FF] text-[#fff] hover:bg-[#0000FF]">
                                <div className="relative -top-[1px]">Sign up</div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}