"use client"

import { ChannelHeader } from "./_components/ChannelHeader";
import { MessageInputForm } from "./_components/message/MessageInputForm";
import { MessageList } from "./_components/MessageList";

const ChannelPageMain = () => {

  return (
    <div className="flex h-screen w-full">
      {/* Main Channel Area */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* fixed header */}
        <ChannelHeader />

        {/* Scrollable Message area */}
        <div className="flex-1 overflow-hidden mb-4">
          <MessageList />
        </div>
                  {/* Fixed input */}
        <div className="border-t bg-background p-4">
         <MessageInputForm />
      
        </div>
      </div>
    </div>
  );
};

export default ChannelPageMain;
