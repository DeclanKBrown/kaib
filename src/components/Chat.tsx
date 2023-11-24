import ChatInput from './ChatInput';

const Chat = () => {

  return (
    <div className="flex max-w-full flex-1 flex-col">
      <div className="relative h-full w-full transition-width flex flex-col overflow-hidden items-stretch flex-1">
        <ChatInput />
      </div>
    </div>
  );
};

export default Chat;
