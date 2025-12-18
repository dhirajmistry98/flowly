import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogoutLink,PortalLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { CreditCard, LogOut, User } from "lucide-react";

const user = {
  picture: "https://avatars.githubusercontent.com/u/124599?v=4",
  given_name: "Dhiraj",
};
export function UserNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="size-12 rounded-xl border-border/50 hover:bg-accent hover:text-accent-foreground hover:rounded-lg transition-all duration-200 bg-background/50"
        >
          <Avatar>
            <AvatarImage
              src={user.picture}
              alt="User Image"
              className="object-cover"
            />
            <AvatarFallback>
              {user.given_name.slice(0, 1).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side="right"
        sideOffset={8}
        className="w-50"
      >
        <DropdownMenuLabel className="font-normal flex items-center gap-2 px-1 py-1.5 text-left text-sm">
          <Avatar className="relative size-8">
            <AvatarImage
              src={user.picture}
              alt="User Image"
              className="object-cover"
            />
            <AvatarFallback>
              {user.given_name.slice(0, 1).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="gird flex-1 text-left text-sm leading-tight">
<p className="truncate font-medium">{user.given_name}</p>
<p className="text-muted-foreground truncate text-xs ">dhriaj1368@gmail.com</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator/>
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
             <PortalLink>
               <User/>
            Account
             </PortalLink>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <PortalLink>
                 <CreditCard/>
            Billing
              </PortalLink>
            </DropdownMenuItem>
          </DropdownMenuGroup>

        <DropdownMenuSeparator/>
         <DropdownMenuItem asChild>
             <LogoutLink>
              <LogOut/>
              Log Out
             </LogoutLink>
              </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
