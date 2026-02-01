import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { EmojiReaction } from "./EmojiReaction";
import { orpc } from "@/lib/orpc";
import { toast } from "sonner";
import { GroupedReactionSchemaType } from "@/app/schemas/message";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { MessagelistItem } from "@/lib/types";
import { count } from "console";

type ThreadContext = { type: "thread"; threadId: string };
type ListContext = { type: "list"; channelId: string };
interface ReactionsBarProps {
  messageId: string;
  reactions: GroupedReactionSchemaType[];
  context?: ThreadContext | ListContext;
}
type MessagePage = {
  items: MessagelistItem[];
  nextCursor?: string;
};

type InfiniteReplies = InfiniteData<MessagePage>;
export function ReactionsBar({
  messageId,
  reactions,
  context,
}: ReactionsBarProps) {
  const { channelId } = useParams<{ channelId: string }>();
  const queryClient = useQueryClient();
  const toggleMutation = useMutation(
    orpc.message.reaction.toggle.mutationOptions({
      onMutate: async (vars: { messageId: string; emoji: string }) => {
        const isThread = context && context.type === "thread";
        if (isThread) {
          console.log("this is a thread");
        }
        const listKey = ["message.list", channelId];
        await queryClient.cancelQueries({ queryKey: listKey });
        const previous = queryClient.getQueryData(listKey);
        queryClient.setQueryData<InfiniteReplies>(listKey, (old) => {
          if (!old) return old;

          const pages = old.pages.map((page) => ({
            ...page,
            items: page.items.map((m) => {
              if (m.id !== messageId) return m;

              const current = m.reactions;

              const existing = current.find((r) => r.emoji === vars.emoji);
              let next: GroupedReactionSchemaType[];
              if (existing) {
                const dec = existing.count - 1;

                if (dec <= 0) {
                  next = current.filter((r) => r.emoji !== existing.emoji);
                } else {
                  next = current.map((r) =>
                    r.emoji === existing.emoji
                      ? { ...r, count: dec, reactedByMe: false }
                      : r,
                  );
                }
              } else {
                next = [
                  ...current,
                  { emoji: vars.emoji, count: 1, reactedByMe: true },
                ];
              }

              return {
                ...m,
                reactions: next,
              };
            }),
          }));
          return {
            ...old,
            pages,
          };
        });
      },
      onSuccess: () => {
        return toast.success("Emoji Added!");
      },
      onError: () => {
        return toast.error("Emoji not added");
      },
    }),
  );

  const handleToggle = (emoji: string) => {
    toggleMutation.mutate({ emoji, messageId });
  };
  return (
    <div className="mt-1 flex items-center gap-1">
      {reactions.map((r) => (
        <Button
          variant="secondary"
          size="sm"
          key={r.emoji}
          type="button"
          className={cn(
            "h-6 px-2 text-xs",
            r.reactedByMe && "bg-primary/10 border-primary/10 border",
          )}
          onClick={() => handleToggle(r.emoji)}
        >
          <span>{r.emoji}</span>
          <span>{r.count}</span>
        </Button>
      ))}
      <EmojiReaction onSelect={handleToggle} />
    </div>
  );
}
