const MessageBox = ({ message }: any) => {
  
    const isUser = message.role === "user"

    console.log(message.content)
  
    return (
      <div className="group w-full text-gray-800 border-b border-black/10">
        <div className="text-base gap-4 md:gap-6 md:max-w-2xl lg:max-w-xl xl:max-w-3xl flex lg:px-0 m-auto w-full">
          <div className="flex flex-row gap-4 md:gap-6 md:max-w-2xl lg:max-w-xl xl:max-w-3xl p-4 md:py-6 lg:px-0 m-auto w-full">
            <div className="w-8 flex flex-col relative items-end">
              <div className="relative h-7 w-7 p-1 rounded-sm text-white flex items-center justify-centertext-opacity-100r">
                {/* ICONS */}
              </div>
            </div>
            <div className="relative flex w-[calc(100%-50px)] flex-col gap-1 md:gap-3 lg:w-[calc(100%-115px)]">
              <div className="flex flex-grow flex-col gap-3">
                <div className="min-h-20 flex flex-col items-start gap-4 whitespace-pre-wrap break-words">
                  <div className="markdown prose w-full break-words text-black">
                    {message.content.split('\n').map((currentTextBlock: string, index: number) => (
                      currentTextBlock === "" ? <p key={message.id + index}>&nbsp;</p> : <p key={message.id + index}>{currentTextBlock}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default MessageBox