"use client";

import { orpc } from "@/lib/orpc";
import { useSuspenseQuery } from "@tanstack/react-query";
import Link from "next/link";

export function WorkspaceHeader() {
  const {
    data: { currentWorkspace, plan },
  } = useSuspenseQuery(orpc.channel.list.queryOptions());

  const planValue = plan || "tier-free";

  return (
    <div className="flex items-center gap-2">
      <h2 className="text-lg font-semibold">{currentWorkspace.orgName}</h2>
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
        {planValue === "tier-free" && (
          <Link
            href="/workspace/billing"
            className="text-[10px] text-muted-foreground hover:text-primary transition-colors underline decoration-dotted"
          >
            Upgrade
          </Link>
        )}
      </div>
    </div>
  );
}
