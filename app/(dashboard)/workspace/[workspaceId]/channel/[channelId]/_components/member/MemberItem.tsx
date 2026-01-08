import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getAvatar } from "@/lib/get-avatar";
import { organization_user } from "@kinde/management-api-js";
import Image from "next/image";

interface MemberItemProps {
  member: organization_user;
}

export function MemberItem({ member }: MemberItemProps) {
  return (
    <div className="px-3 py-2 hover:bg-accent cursor-pointer transition-colors">
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <Avatar className="size-8 shrink-0">
          <Image
            src={getAvatar(member.picture ?? null, member.email!)}
            alt="Member Avatar"
            fill
            className="object-cover"
          />
          <AvatarFallback>
            {member.full_name?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        {/* Name + Email */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{member.full_name}</p>
          <p className="text-xs text-muted-foreground truncate">
            {member.email}
          </p>
        </div>

        {/* Role badge (RIGHT aligned) */}
        <span className="shrink-0 rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-400/30">
          Admin
        </span>
      </div>
    </div>
  );
}
