import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { orpc } from "@/lib/orpc";
import { useQuery } from "@tanstack/react-query";
import { Search, UserIcon } from "lucide-react";
import { useState } from "react";
import { MemberItem } from "./MemberItem";
import { Skeleton } from "@/components/ui/skeleton";

export function MemberOverview() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const { data, isLoading ,error} = useQuery(
    orpc.workspace.member.list.queryOptions()
  );
  if (error) {
    <h1>Error:{error.message}</h1>;
  }

  const members = data ?? [];

  const query = search.trim().toLowerCase();
  const filteredMembers = query
    ? members.filter((m) => {
        const name = m.full_name?.toLowerCase() || "";
        const email = m.email?.toLowerCase() || "";
        return name.includes(query) || email.includes(query);
      })
    : members;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="gap-2">
          <UserIcon className="size-4" />
          <span>Members</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent align="end" className="p-0 w-[320px]">
        {/* Header */}
        <div className="px-4 py-3 border-b">
          <h3 className="font-semibold text-sm">Workspace Members</h3>
          <p className="text-xs text-muted-foreground">Members</p>
        </div>

        {/* Search */}
        <div className="p-3 border-b">
          <div className="relative">
            <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-8 w-full rounded-md border bg-background text-sm"
              placeholder="Search members..."
            />
          </div>
        </div>

        {/* Members */}
        <div className="max-h-80 overflow-y-auto">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 px-3 py-2">
                <Skeleton className="size-8 rounded-full" />
                <div className="flex flex-col space-y-1">
                  <Skeleton className="h-3 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            ))
          ) : filteredMembers.length === 0 ? (
            <p className="px-4 py-6 text-sm text-muted-foreground text-center">
              No members found.
            </p>
          ) : (
            filteredMembers.map((member) => (
              <MemberItem key={member.id} member={member} />
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
