'use client'

import { Message } from 'ai/react'
import { useRef, useEffect } from "react"
import MessageBox from "./MessageBox"

const Messages = ({ messages }: any) => {
    const bottomOfChatRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (bottomOfChatRef.current) {
          bottomOfChatRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, [messages])

    return (

    <div className="flex-1 overflow-auto h-full">
        <div className="react-scroll-to-bottom--css-ikyem-79elbk h-full">
            <div className="react-scroll-to-bottom--css-ikyem-1n7m0yu">
                <div className="flex flex-col items-center text-sm">
                  {messages.map((message: Message) => (
                    <MessageBox key={message.id} message={message} />
                  ))}
                  <div className="w-full h-32 md:h-48 flex-shrink-0"></div>
                  <div ref={bottomOfChatRef}></div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Messages