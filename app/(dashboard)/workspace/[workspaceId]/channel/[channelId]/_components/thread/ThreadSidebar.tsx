import { Button } from "@/components/ui/button";
import { MessageSquare, X } from "lucide-react";
import Image from "next/image";
import { ThreadReply } from "./ThreadReply";
import { ThreadReplyForm } from "./ThreadReplyForm";
import { useThread } from "@/provider/ThreadProvider";

const Messages = [
  {
    id: "1",
    authorName: "Alice",
    authorImage: "https://avatars.githubusercontent.com/u/170039520?v=4",
    content: "Hello, how are you?",
    createdAt: new Date(),
  },
  {
    id: "2",
    authorName: "Alice",
    authorImage: "https://avatars.githubusercontent.com/u/170039520?v=4",
    content: "Hello, how are you?",
    createdAt: new Date(),
  },
  {
    id: "3",
    authorName: "Alice",
    authorImage: "https://avatars.githubusercontent.com/u/170039520?v=4",
    content: "Hello, how are you?",
    createdAt: new Date(),
  },
  {
    id: "4",
    authorName: "Alice",
    authorImage: "https://avatars.githubusercontent.com/u/170039520?v=4",
    content: "Hello, how are you?",
    createdAt: new Date(),
  },
];
export function ThreadSidebar() {

  const { selectedThreadId,closeThread } = useThread();
  return (
    <div className="w-120 border-l flex flex-col h-full">
      {/* Header */}
      <div className="border-b h-14 px-4 flex items-center justify-between ">
        <div className="flex items-center gap-2">
          <MessageSquare className="size-4" />
          <span>Thread</span>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={closeThread} variant="outline" size="icon">
            <X className="size-4" />
          </Button>
        </div>
      </div>
      {/* main content area */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 border-b bg-muted/20">
          <div className="flex space-x-3 ">
            <Image
              src={Messages[0].authorImage}
              alt="Author Image"
              className="rounded-full size-8 shrink-0"
              width={32}
              height={32}
            />
            <div className="flex-1 space-y-1 min-w-0 ">
              <div className="flex items-center space-x-2">
                <span className="font-medium text-sm ">
                  {Messages[0].authorName}
                </span>
                <span className="text-xs text-muted-foreground">
                  {new Intl.DateTimeFormat("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                    day: "numeric",
                  }).format(Messages[0].createdAt)}
                </span>
              </div>
              <p className="text-sm break-word dark:prose-invert max-w-none">
                {Messages[0].content}
              </p>
            </div>
          </div>
        </div>
  {/* Replies header */}
        <div className="p-2">
          <p className="text-xs text-muted-foreground mb-3 px-2">
            {Messages.length} replies
          </p>
        </div>
        <div className="space-y-1 ">
         {Messages.map((reply) => (
           <ThreadReply key={reply.id} message={reply}/>
         ))} 
        </div>
        
      </div>
      {/* Thread reply form */}
      <div className="border-t p-4 bg-background sticky bottom-0">

       <ThreadReplyForm threadId={selectedThreadId}/>
      </div>
    </div>
  );
}
