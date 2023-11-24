const Sidebar = () => {
    return (
        <div className="scrollbar-trigger flex h-full w-full flex-1 items-start border-r border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl">
            <nav className="flex h-full flex-1 flex-col space-y-1 p-2">
                <div className="flex items-center justify-center">
                    <h1 className="font-mono text-lg">Kaib</h1>
                </div>
            </nav>
        </div>
    )
}

export default Sidebar

