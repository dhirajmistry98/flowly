
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';
import { client } from '@/lib/orpc'
import { Cloud } from 'lucide-react';
import { redirect } from 'next/navigation';
import CreateNewChannel from './_components/CreateNewChannel';


interface iAppProps{
  params: Promise<{workspaceId: string}>
}

const  WorkSpacePageId = async ({params}:iAppProps) => {
  const {workspaceId} = await params;
  const { channels } = await client.channel.list();

  if (channels.length > 0) {
    return redirect(`/workspace/${workspaceId}/channel/${channels[0].id}`)
  }
  return (
  <div className='p-15 flex flex-1'>
     <Empty className="from-muted/50 to-background h-full bg-linear-to-b from-30%">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Cloud />
        </EmptyMedia>
        <EmptyTitle>No channels created yet!!</EmptyTitle>
        <EmptyDescription>
         Add a channel to organize topics, conversations, and ideas.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className='max-w-sm ax-auto'>
    <CreateNewChannel/>
      </EmptyContent>
    </Empty>
  </div>
  )
}

export default WorkSpacePageId