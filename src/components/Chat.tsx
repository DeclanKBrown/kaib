'use client'
import ChatInput from './ChatInput'
import Messages from './Messages'

import { useChat } from 'ai/react'

const Chat = () => {
   //Vercel AI SDK
   const { input, handleInputChange, handleSubmit, isLoading, messages } = useChat()

  return (
    <div className="flex max-w-full flex-1 flex-col">
      <div className="relative h-full w-full transition-width flex flex-col overflow-hidden items-stretch flex-1">
        <div className='flex h-full flex-col'>
          <Messages 
            messages={messages}
          />
          <ChatInput 
            input={input}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
