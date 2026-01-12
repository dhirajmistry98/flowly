import { SafeContent } from "@/components/rich-text-editor/SafeContent";
import { getAvatar } from "@/lib/get-avatar";
import Image from "next/image";
import { MessageHoverToolbar } from "../toolbar";
import { useState } from "react";
import { EditMessage } from "../toolbar/EditMessage";
import { MessagelistItem } from "@/lib/types";
import { MessageSquare } from "lucide-react";

interface iAppProps {
  message: MessagelistItem ;
  currentUserId: string;
}

export function MessageItem({ message, currentUserId }: iAppProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="relative flex space-x-3 p-3 rounded-lg group hover:bg-muted/50">
      <Image
        src={getAvatar(message.authorAvatar, message.authorEmail)}
        alt="User Avatar"
        width={32}
        height={32}
        className="size-8 rounded-lg shrink-0"
      />
      <div className="flex-1 space-y-1 min-w-0">
        <div className="flex items-center gap-x-2">
          <p className="font-medium leading-none">{message.authorName}</p>
          <p className="text-xs text-muted-foreground leading-none">
            {new Intl.DateTimeFormat("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            }).format(message.createdAt)}
          </p>
        </div>

        {isEditing ? (
          <div className="mt-2">
            <EditMessage
              message={message}
              onCancel={() => setIsEditing(false)}
              onSave={() => setIsEditing(false)}
            />
          </div>
        ) : (
          <>
            <SafeContent
              className="text-sm wrap-break-word prose dark:prose-invert max-w-none mark:text-primary"
              content={JSON.parse(message.content)}
            />
            {message.imageUrl && (
              <div className="mt-3">
                <Image
                  src={message.imageUrl}
                  alt="Message Attachment"
                  width={512}
                  height={512}
                  className="rounded-md max-h-80 w-auto object-contain"
                />
              </div>
            )}
            {message.repliesCount > 0 && (
              <button type="button" className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-border cursor-pointer">
                <MessageSquare className="size-3.5"/>
                <span>{message.repliesCount} {message.repliesCount === 1 ? 'reply' :'replies'}</span>
                
              </button>
            )}
          </>
        )}
      </div>

      {/* Only show toolbar when not editing */}
      {!isEditing && (
        <MessageHoverToolbar
          messageId={message.id}
          canEdit={message.authorId === currentUserId}
          onEdit={() => setIsEditing(true)}
        />
      )}
    </div>
  );
}
