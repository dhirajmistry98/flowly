import { Button } from "@/components/ui/button";
import { useThread } from "@/provider/ThreadProvider";
import { MessageSquareText, Pencil } from "lucide-react";

interface MessageHoverToolbarProps {
  messageId: string;
  canEdit: boolean;
  onEdit: () => void;
}

export function MessageHoverToolbar({
  messageId,
  canEdit,
  onEdit,
}: MessageHoverToolbarProps) {
  const { toggleThread } = useThread();
  
  return (
    <div
      className="absolute top-2 right-2 flex items-center gap-1 rounded-md border
        border-gray-200 bg-white/95 py-1 px-1.5 shadow-sm backdrop-blur-sm
        transition-opacity opacity-0 group-hover:opacity-100 
        dark:border-neutral-800 dark:bg-neutral-900/95 z-10"
    >
      {canEdit && (
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-7 w-7"
          onClick={onEdit}
          type="button"
        >
          <Pencil className="size-3.5" />
        </Button>
      )}
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-7 w-7"
        onClick={() => toggleThread(messageId)}
        type="button"
      >
        <MessageSquareText className="size-3.5" />
      </Button>
    </div>
  );
}