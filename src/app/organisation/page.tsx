'use client'

import Link from "next/link"

export default function Organisation() {
    return (
        <div className="flex min-h-screen w-screen flex-col">
            <header className="flex items-center justify-center pt-10">
                <h1 className="font-mono text-lg select-none">KAIB</h1>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
            </header>
            <main className="flex flex-1 items-center justify-center">
                <div className="flex flex-col">
                    <div className="flex items-center pt-5 pb-14 px-5">
                        <h1 className="text-center font-semibold text-[28px] leading-[1.2] md:text-[28px] md:leading-8 select-none w-[23rem] whitespace-nowrap">Select Organisation Option</h1>
                    </div>
                    <div className="flex flex-col justify-center pb-3 px-5">
                        <div className="w-full flex flex-col gap-5">
                            <Link href='/organisation/create' className="relative flex h-12 items-center justify-between rounded-md px-5 text-center text-base font-medium bg-gradient-to-b from-zinc-200 to-zinc-100 backdrop-blur-2xl border border-1 border-zinc-300 hover:border hover:border-1 hover:border-zinc-400">
                                <div className="relative -top-[1px]">Create Organisation</div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                            </Link>
                            <Link href='/organisation/link' className="relative flex h-12 items-center justify-between rounded-md px-5 text-center text-base font-medium bg-gradient-to-b from-zinc-200 to-zinc-100 backdrop-blur-2xl border border-1 border-zinc-300 hover:border hover:border-1 hover:border-zinc-400">
                                <div className="relative -top-[1px]">Link to Existing Organisation</div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}