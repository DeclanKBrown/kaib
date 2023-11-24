'use client'

import React, { useState, ChangeEvent, useRef, useEffect } from 'react';

const ChatTextArea = () => {
    const [message, setMessage] = useState<string>('');
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

    const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(event.target.value);
    }

    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = 'auto';
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
        }
        if (textAreaRef.current && textAreaRef.current.value.trim().length > 0) {
            textAreaRef.current.style.overflowY = 'scroll';
        }
    }, [message, textAreaRef])

    return (
        <div className="absolute bottom-0 left-0 w-full pt-2 ">
            <form className="stretch mx-2 flex flex-row gap-3 border border-gray-300 rounded-lg backdrop-blur-2xl last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
                <div className="relative flex flex-col h-full flex-1 items-stretch md:flex-col">
                    <div className="flex flex-col w-full py-2 flex-grow md:py-3 md:pl-4 relative ">
                        <textarea
                            ref={textAreaRef}
                            tabIndex={0}
                            data-id="root"
                            style={{
                            height: 'auto',
                            maxHeight: '200px',
                            overflowY: 'hidden',
                            }}
                            rows={1}
                            placeholder="Search Knowledge Base..."
                            value={message}
                            onChange={handleInputChange}
                            className="m-0 w-full resize-none pl-2 md:pl-0 bg-transparent outline-none"
                        ></textarea>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ChatTextArea