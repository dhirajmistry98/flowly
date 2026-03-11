"use client";

import { orpc } from "@/lib/orpc";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WorkspaceHeader() {
  const router = useRouter();
  const {
    data: { currentWorkspace, plan },
  } = useSuspenseQuery(orpc.channel.list.queryOptions());

  const planValue = plan || "tier-free";

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => router.back()}
        className="h-7 w-7"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <div className="flex items-center gap-1.5 overflow-hidden">
        <h2 className="text-lg font-semibold truncate">{currentWorkspace.orgName}</h2>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 rounded-md px-1.5 py-0.5 border border-primary/20">
          {planValue === "tier-free"
            ? "Free"
            : planValue === "tier-pro"
              ? "Pro"
              : planValue === "tier-ai"
                ? "AI"
                : planValue}
        </span>
      </div>
    </div>
  );
}
