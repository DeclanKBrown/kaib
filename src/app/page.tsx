import Chat from '@/components/Chat'
import Sidebar from '@/components/Sidebar'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="overflow-hidden w-full h-screen relative flex">
       <div className="hidden flex-shrink-0 md:flex md:w-[260px] md:flex-col">
        <div className="flex h-full min-h-0 flex-col ">
          <Sidebar />
        </div>
      </div>
      <Chat />
    </main>
  )
}