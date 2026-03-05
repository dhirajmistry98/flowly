"use client";

import { buttonVariants } from "@/components/ui/button";
import { orpc } from "@/lib/orpc";
import { cn } from "@/lib/utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Hash } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export function ChannelList() {
  const {
    data: { channels, plan },
  } = useSuspenseQuery(orpc.channel.list.queryOptions());
  const { workspaceId, channelId } = useParams<{ 
    workspaceId: string;
    channelId: string ;
  }>();

  const isFreePlan = plan === "tier-free" || !plan;

  return (
    <div className="space-y-0.5 py-1">
      {channels.map((channel) => {
        const isActive = channel.id === channelId;
        return (
          <Link
            className={buttonVariants({
              variant: "ghost",
              className: cn(
                "w-full justify-start px-2 py-1 h-7 text-muted-foreground hover:text-accent-foreground hover::bg-accent",
                isActive && "text-accent-foreground bg-accent"
              ),
            })}
            key={channel.id}
            href={`/workspace/${workspaceId}/channel/${channel.id}`}
          >
            <Hash className="size-4 " />
            <span className="truncate">{channel.name}</span>
          </Link>
        );
      })}
      {isFreePlan && (
        <div className="px-2 py-2 mt-4">
          <div className="flex justify-between items-center text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1">
            <span>Usage</span>
            <span>{channels.length}/5</span>
          </div>
          <div className="h-1 w-full bg-secondary rounded-full overflow-hidden border border-border/50">
            <div 
              className={cn(
                "h-full transition-all duration-500",
                channels.length >= 4 ? "bg-destructive" : "bg-primary"
              )}
              style={{ width: `${Math.min((channels.length / 5) * 100, 100)}%` }}
            />
          </div>
          {channels.length >= 5 && (
            <p className="text-[10px] text-destructive mt-1 font-medium">
              Limit reached. Upgrade for more!
            </p>
          )}
        </div>
      )}
    </div>
  );
}
