import { Button } from "@/components/ui/button";
import { ChevronDown, MessageSquare, X } from "lucide-react";
import Image from "next/image";
import { ThreadReply } from "./ThreadReply";
import { ThreadReplyForm } from "./ThreadReplyForm";
import { useThread } from "@/provider/ThreadProvider";
import { useQuery } from "@tanstack/react-query";
import { orpc } from "@/lib/orpc";
import { SafeContent } from "@/components/rich-text-editor/SafeContent";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs";
import { ThreadSidebarSkeleton } from "./ThreadSidebarSkeleton";
import { useEffect, useRef, useState } from "react";
import { ReactionsBar } from "../reaction/ReactionBar";
import { SummarizeThread } from "./SummarizeThread";

interface ThreadSidebarProps {
  user: KindeUser<Record<string, unknown>>;
}

export function ThreadSidebar({ user }: ThreadSidebarProps) {
  const { selectedThreadId, closeThread } = useThread();
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const lastMessageCountRef = useRef(0);
  const { data, isLoading } = useQuery(
    orpc.message.thread.list.queryOptions({
      input: {
        messageId: selectedThreadId!,
      },

      enabled: Boolean(selectedThreadId),
    })
  );

  const messageCount = data?.messages.length ?? 0;

  const isNearBottom = (el: HTMLDivElement) =>
    el.scrollHeight - el.scrollTop - el.clientHeight <= 100;

  const handleScroll = () => {
    const el = scrollRef.current;

    if (!el) return;

    setIsAtBottom(isNearBottom(el));
  };

  useEffect(() => {
    if (messageCount === 0) return;

    const prevMessageCount = lastMessageCountRef.current;
    const el = scrollRef.current;

    if (prevMessageCount > 0 && messageCount !== prevMessageCount) {
      if (el && isNearBottom(el)) {
        requestAnimationFrame(() => {
          bottomRef.current?.scrollIntoView({
            block: "end",
            behavior: "smooth",
          });

          setIsAtBottom(true);
        });
      }
    }

    lastMessageCountRef.current = messageCount;
  }, [messageCount]);

  useEffect(() => {
    const el = scrollRef.current;

    if (!el) return;

    const scrollToBottomIfNeed = () => {
      if (isAtBottom) {
        requestAnimationFrame(() => {
          bottomRef.current?.scrollIntoView({ block: "end" });
        });
      }
    };
    const onImageLoad = (e: Event) => {
      if (e.target instanceof HTMLImageElement) {
        scrollToBottomIfNeed();
      }
    };

    el.addEventListener("load", onImageLoad, true);

    const resizeObserver = new ResizeObserver(() => {
      scrollToBottomIfNeed();
    });
    resizeObserver.observe(el);

    //MutationsObserver watches from DOM changes
    const mutationObserver = new MutationObserver(() => {
      scrollToBottomIfNeed();
    });
    mutationObserver.observe(el, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true,
    });

    return () => {
      resizeObserver.disconnect();
      el.removeEventListener("load", onImageLoad, true);
      mutationObserver.disconnect();
    };
  }, [isAtBottom]);

  const scrollToBottom = () => {
    const el = scrollRef.current;
    if (!el) return;

    bottomRef.current?.scrollIntoView({
      block: "end",
      behavior: "smooth",
    });
    setIsAtBottom(true);
  };

  if (isLoading) {
    return <ThreadSidebarSkeleton />;
  }
  return (
    <div className="w-120 border-l flex flex-col h-full">
      {/* Header */}
      <div className="border-b h-14 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="size-4" />
          <span>Thread</span>
        </div>
        <div className="flex items-center gap-2">
          <SummarizeThread messageId={selectedThreadId!} />
          <Button onClick={closeThread} variant="outline" size="icon">
            <X className="size-4" />
          </Button>
        </div>
      </div>
      {/* main content area */}
      <div className="flex-1 overflow-y-auto relative">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="h-full overflow-y-auto"
        >
          {data && (
            <>
              <div className="p-4 border-b bg-muted/20">
                <div className="flex space-x-3 ">
                  <Image
                    src={data.parent.authorAvatar}
                    alt="Author Image"
                    className="rounded-full size-8 shrink-0"
                    width={32}
                    height={32}
                  />
                  <div className="flex-1 space-y-1 min-w-0 ">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-sm ">
                        {data.parent.authorName}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Intl.DateTimeFormat("en-US", {
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                          day: "numeric",
                        }).format(data.parent.createdAt)}
                      </span>
                    </div>

                    <SafeContent
                      className="text-sm break-word dark:prose-invert max-w-none"
                      content={JSON.parse(data.parent.content)}
                    />
                    {data.parent.imageUrl && (
                      <div className="mt-2">
                        <Image
                          src={data.parent.imageUrl}
                          alt="Message Attachment"
                          width={512}
                          height={512}
                          className="rounded-md max-h-80 w-auto object-contain"
                        />
                      </div>
                    )}
                    <ReactionsBar
                      messageId={data.parent.id}
                      reactions={data.parent.reactions}
                      context={{ type: "thread", threadId: selectedThreadId! }}
                    />
                  </div>
                </div>
              </div>
              {/* Replies header */}
              <div className="p-2">
                <p className="text-xs text-muted-foreground mb-3 px-2">
                  {data.messages.length} replies
                </p>
                <div className="space-y-1 ">
                  {data.messages.map((reply) => (
                    <ThreadReply selectedThread={selectedThreadId!} key={reply.id} message={reply} />
                  ))}
                </div>
              </div>
              <div ref={bottomRef}> </div>
            </>
          )}
        </div>
        {!isAtBottom && (
          <Button
            type="button"
            size="sm"
            onClick={scrollToBottom}
            className="absolute bottom-4 right-5 z-20 size-10 rounded-full hover:shadow-xl transition-all duration-200"
          >
            <ChevronDown className="size-4" />
          </Button>
        )}
      </div>
      {/* Thread reply form */}
      <div className="border-t p-4 bg-background sticky bottom-0">
        <ThreadReplyForm threadId={selectedThreadId!} user={user} />
      </div>
    </div>
  );
}