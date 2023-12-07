import Link from "next/link"

export default function Login() {
    return (
        <div className="flex min-h-screen w-screen flex-col">
            <header className="flex items-center justify-center pt-10">
                <h1 className="font-mono text-lg select-none">KAIB</h1>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
            </header>
            <main className="flex flex-1 items-center justify-center">
                <div className="flex flex-col">
                    <div className="flex items-center pt-5 pb-8 px-5">
                        <h1 className="text-center font-semibold text-[20px] leading-[1.2] md:text-[32px] md:leading-8 select-none w-[18rem]">Welcome Back</h1>
                    </div>
                    <div className="flex flex-col justify-center pb-3 px-5">
                        <div className="w-full">
                            <form className="flex flex-col w-full gap-5">
                                <input type="email" className="w-full border border-zinc-300 rounded-md h-12 pl-2" placeholder="email">

                                </input>
                                <input type="password" className="w-full border border-zinc-300 rounded-md h-12 pl-2" placeholder="password">

                                </input>
                                <button className="relative flex h-12 items-center justify-center rounded-md text-center text-base font-medium bg-[#3C46FF] text-[#fff] hover:bg-[#0000FF]">
                                    <div className="relative -top-[1px]">Continue</div>
                                </button>
                            </form>
                        </div>
                        <div className="mt-5 flex justify-center w-full">
                            <p className="text-center">Don&apos;t have an account? <Link href='/auth/signup' className="text-[#3C46FF] underline">Sign Up</Link></p>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    )
}