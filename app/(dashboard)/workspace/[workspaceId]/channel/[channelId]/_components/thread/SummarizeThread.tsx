import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Sparkle } from "lucide-react";
import { useChat } from "@ai-sdk/react";
import { eventIteratorToStream } from "@orpc/server";
import { client } from "@/lib/orpc";
import { Skeleton } from "@/components/ui/skeleton";

interface SummarizeThreadProps {
  messageId: string;
}

export function SummarizeThread({ messageId }: SummarizeThreadProps) {
  const {
    messages,
    status,
    error,
    sendMessage,
    setMessages,
    stop,
    clearError,
  } = useChat({
    id: `thread-summary:${messageId}`,
    transport: {
      async sendMessages(options) {
        return eventIteratorToStream(
          await client.ai.thread.summary.generate(
            {
              messageId: messageId,
            },
            { signal: options.abortSignal },
          ),
        );
      },
      reconnectToStream(){
        throw new Error()
      }
    },
  });
const lastAssistant = messages.findLast((m) => m.role === 'assistant')

const SummaryText = lastAssistant?.parts.filter((p) => p.type === 'text').map((p) => p.text).join('\n\n') ?? ''
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          size="sm"
          className="relative overflow-hidden rounded-full 
        bg-linear-to-t from-violet-600 to-fuchsia-600 text-white hover:shadow-lg focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="flex items-center gap-1.5">
            <Sparkle className="size-3.5" />
            <span className="text-xs font-medium">Summarize</span>
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-100 py-0" align="end">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <div className="flex items-center gap-2">
            <span className="relative inline-flex items-center justify-center rounded-full bg-linear-to-r from-violet-600 to-fuchsia-600 px-4 py-1.5 text-white">
              <Sparkle className="size-3.5" />
              <span className="text-sm font-medium">Summarize Thread</span>
            </span>
          </div>
          {status === 'streaming' &&(
            <Button 
             onClick={()=>{
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
          {error?(
              <div>
                <p className="text-red-500"> {error.message}</p>
                <Button type="button" size="sm" onClick={()=>{
                  clearError()
                  setMessages([])
                sendMessage({text:'Summarize this thread'})
                }}>
                  Try Again
                </Button>
              </div>
          ): SummaryText ?(
            <p className="text-sm text-gray-500">{SummaryText}</p>

          ): status === 'submitted' || status === 'streaming' ? (
            <div>
              <Skeleton className="h-4 w-3/5"/>
             <Skeleton className="h-4 w-full"/>
             <Skeleton className="h-4 w-5/6"/>
            </div>
          ):(
            <div className="text-sm text-muted-foreground ">
              Click Summarize to  generate
            </div>
          )}

        </div>
      </PopoverContent>
    </Popover>
  );
}
