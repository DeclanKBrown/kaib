'use client'
import ChatInput from './ChatInput'
import Messages from './Messages'
import { createThread } from '@/lib/openai/functions'
import React, { useEffect, useState } from 'react'
import { experimental_useAssistant } from 'ai/react'
import 'react-loading-skeleton/dist/skeleton.css'

const Chat = () => {
  //Create thread
  const [threadId, setThreadId] = useState<string>('')
  useEffect(() => {
      const initThread = async () => {
        const thread = await createThread()
        if (thread && thread.id) {
          const threadID = thread.id
          setThreadId(threadID)
        } 
      }
      initThread()
  }, [])

   //Vercel AI SDK
  const { input, handleInputChange, submitMessage, messages  } = experimental_useAssistant({
    api: 'api/chat',
    threadId: threadId,
  })

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
              submitMessage={submitMessage}
            />
          </div>
      </div>
    </div>
  );
};

export default Chat;
