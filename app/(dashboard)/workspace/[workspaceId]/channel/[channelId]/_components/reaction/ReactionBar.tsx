import { useMutation } from "@tanstack/react-query";
import { EmojiReaction } from "./EmojiReaction";
import { orpc } from "@/lib/orpc";
import { toast } from "sonner";
import { GroupedReactionSchemaType } from "@/app/schemas/message";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";


interface ReactionsBarProps{
  messageId: string;
  reactions: GroupedReactionSchemaType[];
}
export function ReactionsBar({messageId, reactions}:ReactionsBarProps) {
  const toggleMutation = useMutation(
    orpc.message.reaction.toggle.mutationOptions({
      onSuccess: () => {
        return toast.success("Emoji Added!");
      },
      onError: () => {
        return toast.error("Emoji not added");
      },
    }),
  );

  const handleToggle = (emoji: string) => {
    toggleMutation.mutate({emoji,messageId})
  };
  return (
    <div className="mt-1 flex items-center gap-1">
      {reactions.map((r) =>(
        <Button variant="secondary" size="sm" key={r.emoji} type="button" className={cn(
          "h-6 px-2 text-xs",r.reactedByMe && 'bg-primary/10 border-primary/10 border'
        )}
        onClick={()=>handleToggle(r.emoji)}
        >
        <span>{r.emoji}</span>
        <span>{r.count}</span>
        </Button>
      ))}
      <EmojiReaction onSelect={handleToggle} />
    </div>
  );
}
