'use client'
import app from '@/lib/firebase/config'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import React, { useRef, useEffect, useState } from 'react'

const db = getFirestore(app)

const ChatInput = ({ input, handleInputChange, submitMessage }: any) => {
    //Handle Text Are Resize
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null)
    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = 'auto'
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
        }
        if (textAreaRef.current && textAreaRef.current.value.trim().length > 0) {
            textAreaRef.current.style.overflowY = 'scroll'
        }
    }, [input, textAreaRef])

    //Get user organisation
    const auth = getAuth(app)

    const [assistantId, setAssistantId] = useState<string>()

    useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        if (user) {            
            const getAssistantId = async () => {
                const userSnap = await getDoc(doc(db, "user", user.uid))
    
                const organisationSnap = await getDoc(doc(db, 'organisation', userSnap.get('organisationId')))

                console.log(organisationSnap.get('assistantId'))

                setAssistantId(organisationSnap.get('assistantId'))
            }
            getAssistantId()
        }
    })
    }, [auth])

    //Handle Post
    const handleKeypress = (e: any) => {
        // It triggers by pressing the enter key
        if (e.keyCode == 13 && !e.shiftKey) {
            e.preventDefault()
            const requestOptions = {
                data: {
                    assistantId: assistantId
                }
            }
            submitMessage(e as React.FormEvent<HTMLFormElement>, requestOptions)
        }
    }

    return (
        <div className="absolute bottom-0 left-0 w-full bg-white">
            <form className="stretch mx-2 flex flex-row gap-3 border border-gray-300 rounded-lg backdrop-blur-2xl last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl"
                onSubmit={submitMessage}>
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
                            value={input}
                            onChange={handleInputChange}
                            onKeyDown={handleKeypress}
                            className="m-0 w-full resize-none pl-2 md:pl-0 bg-transparent outline-none"
                        ></textarea>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ChatInput