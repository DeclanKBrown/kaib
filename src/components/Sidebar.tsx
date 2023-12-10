import Link from "next/link"
import UserInfo from "./UserInfo"

const Sidebar = () => {
    return (
        <div className="scrollbar-trigger flex h-full w-full flex-1 items-start border-r border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl">
            <nav className="flex h-full flex-1 flex-col space-y-1 p-2 justify-between">
                <div>
                    <div className="flex items-center justify-center gap-2 py-4">
                        <h1 className="font-mono text-lg">KAIB</h1>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                    </div>
                    <div className="px-2">
                        <Link href='/'>
                            <div className="flex items-center justify-between gap-2 py-2 px-2 mb-6 hover:bg-zinc-300 rounded-lg">
                                <h2 className="font-mono text-base">New Search</h2>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                            </div>
                        </Link>
                        <div className="flex items-center justify-start py-2 px-2">
                            <h3 className="font-mono text-xs text-zinc-600">Knowledge Base</h3>
                        </div>
                        <Link href='/articles'>
                            <div className="flex items-center justify-start gap-2 py-1 px-2 hover:bg-zinc-300 rounded-lg">
                                <h2 className="font-mono text-sm">Articles</h2>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="flex justify-self-end">
                    <UserInfo />
                </div>
            </nav>
        </div>
    )
}

export default Sidebar

