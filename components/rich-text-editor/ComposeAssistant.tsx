import { Sparkle } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { eventIteratorToStream } from "@orpc/server";
import { client } from "@/lib/orpc";
import { MessageResponse } from "@/components/ai-elements/message";
import { Skeleton } from "@/components/ui/skeleton";

interface ComposeAssistantProps {
  content: string;
  onAccept: (markdown: string) => void;
}

export function ComposeAssistant({ content, onAccept }: ComposeAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(content);

  useEffect(() => {
    contentRef.current = content;
  }, [content]);
  const {
    messages,
    status,
    error,
    sendMessage,
    setMessages,
    stop,
    clearError,
  } = useChat({
    id: `compose-assistant`,
    transport: {
      async sendMessages(options) {
        return eventIteratorToStream(
          await client.ai.compose.generate(
            { content: contentRef.current },
            { signal: options.abortSignal },
          ),
        );
      },
      reconnectToStream() {
        throw new Error("Unsupported");
      },
    },
  });
  const lastAssistant = messages.findLast((m) => m.role === "assistant");
  const ComposeText =
    lastAssistant?.parts
      ?.filter((p) => p.type === "text")
      .map((p) => p.text)
      .join("\n\n") ?? "";
  function handleOpenChange(nextIsOpen: boolean) {
    setIsOpen(nextIsOpen);
    if (nextIsOpen) {
      const hasAssistantMessage = messages.some((m) => m.role === "assistant");
      if (status !== "ready" || hasAssistantMessage) {
        return;
      }
      sendMessage({ text: "Compose" });
    } else {
      stop();
      clearError();
      setMessages([]);
    }
  }

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          size="sm"
          className="relative overflow-hidden rounded-full 
        bg-linear-to-t from-violet-600 to-fuchsia-600 text-white hover:shadow-lg focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
        >
          <span className="flex items-center gap-1.5">
            <Sparkle className="size-3.5" />
            <span className="text-xs font-medium">Compose</span>
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-100 py-0">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <div className="flex items-center gap-2">
            <span className="relative inline-flex items-center justify-center rounded-full bg-linear-to-r from-violet-600 to-fuchsia-600 px-4 py-1.5 text-white gap-1.5">
              <Sparkle className="size-3.5" />
              <span className="text-sm font-medium">Compose Assistant</span>
            </span>
          </div>
          {status === "streaming" && (
            <Button
              onClick={() => {
                stop();
              }}
              type="button"
              size="sm"
              variant="outline"
            >
              Stop
            </Button>
          )}
        </div>

        <div className="px-4 py-3 max-h-80 overflow-y-auto">
          {error ? (
            <div>
              <p className="text-red-500"> {error.message}</p>
              <Button
                type="button"
                size="sm"
                onClick={() => {
                  clearError();
                  setMessages([]);
                  sendMessage({ text: "Compose" });
                }}
              >
                Try Again
              </Button>
            </div>
          ) : ComposeText ? (
            <MessageResponse
              parseIncompleteMarkdown={status !== "ready"}
              className="text-sm text-gray-500"
            >
              {ComposeText}
            </MessageResponse>
          ) : status === "submitted" || status === "streaming" ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/5" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          ) : (
            <div className="text-sm text-muted-foreground ">
              Click Compose to generate
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 border-t px-3 py-2 bg-muted/30">
          <Button
            onClick={() => {
              stop();
              setIsOpen(false);
              setMessages([]);
              clearError();
            }}
            type="button"
            size="sm"
            variant="outline"
          >
            Decline
          </Button>
          <Button
            onClick={() => {
              if (!ComposeText) return;
              onAccept?.(ComposeText);
              stop();
              setMessages([]);
              clearError();
              setIsOpen(false);
            }}
            disabled={!ComposeText}
            type="button"
            size="sm"
          >
            Accept
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
