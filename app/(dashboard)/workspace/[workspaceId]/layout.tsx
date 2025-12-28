import React, { ReactNode } from "react";
import { WorkspaceHeader } from "./_components/workspaceHeader";
import CreateNewChannel from "./_components/CreateNewChannel";
import { Collapsible, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import { CollapsibleContent } from "@/components/ui/collapsible";
import { ChannelList } from "./_components/ChannelList";
import { WorkspaceMembersList } from "./_components/WorkspaceMembersList";
import { getQueryClient, HydrateClient } from "@/lib/query/hydration";
import { orpc } from "@/lib/orpc";


const ChannelListLayout =  async ({ children }: { children: ReactNode }) => {

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(orpc.channel.list.queryOptions());

  return (
    <>
      <div className="flex w-80 flex-col border-r bg-secondary  border-border">
        {/* Header */}
        <div className="flex items-center px-4 h-14 border-b border border-border">
          <HydrateClient client={queryClient}>
              <WorkspaceHeader />
          </HydrateClient>
        
        </div>

        <div className="px-4 py-2">
          <CreateNewChannel />
        </div>
        {/* Channel list */}

        <div className="flex-1 overflow-y-auto px-4 ">
          <Collapsible defaultOpen>
            <CollapsibleTrigger className="flex w-full items-center justify-between px-2 py-2 text-sm font-medium text-muted-foreground hover:text-accent-foreground [&[data-state=closed]>svg]:rotate-180">
              Main
              <ChevronDown className="size-4 transition-transform duration-200" />
            </CollapsibleTrigger>
            <CollapsibleContent>
             <HydrateClient client={queryClient}>
               <ChannelList />
             </HydrateClient>
            </CollapsibleContent>
          </Collapsible>
        </div>
        {/* Member list */}
        <div className="px-4 py-2 border-top border-border">
          <Collapsible defaultOpen>
            <CollapsibleTrigger className="flex w-full items-center justify-between px-2 py-2 text-sm font-medium text-muted-foreground hover:text-accent-foreground [&[data-state=open]>svg]:rotate-180">
              Member
              <ChevronUp className="size-4 transition-transform duration-200" />
            </CollapsibleTrigger>
            <CollapsibleContent>
               <HydrateClient client={queryClient}>
                 <WorkspaceMembersList />
               </HydrateClient>
             
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </>
  );
};

export default ChannelListLayout;
