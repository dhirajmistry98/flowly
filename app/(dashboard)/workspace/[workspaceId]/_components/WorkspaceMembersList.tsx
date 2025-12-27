import { AvatarFallback, Avatar } from "@/components/ui/avatar";
import Image from "next/image";

const members = [
  {
    id: 1,
    name: "john Fisher",
    imageUrl: "https://avatars.githubusercontent.com/u/170039520?s=96&v=4",
    email: "dhirajmistry1@gmail.com",
  },
];
export function WorkspaceMembersList() {
  return (
    <div className="space-y-0.5 py-1">
      {members.map((member) => (
        <div key={member.id} className="px-3 py-2 hover:bg-accent cursor-pointer transition-colors flex items-center space-x-3">
          <div className="relative">
            <Avatar className="size-8 relative">
              <Image
                src={member.imageUrl}
                alt="User Image"
                className="object-cover"
                fill
              />
              <AvatarFallback>
                {member.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-1 min-w-0"> 
<p className="text-sm font-medium truncate">{member.name}</p>
<p className="text-sm text-muted-foreground truncate">{member.email}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
