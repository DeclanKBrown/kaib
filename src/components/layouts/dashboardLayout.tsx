import Sidebar from "../Sidebar"
import React from "react"

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <main className="overflow-hidden w-full h-screen relative flex">
          <div className="hidden flex-shrink-0 md:flex md:w-[260px] md:flex-col">
            <div className="flex h-full min-h-0 flex-col ">
              <Sidebar />
            </div>
          </div>
          {children}
        </main>    
    )
}