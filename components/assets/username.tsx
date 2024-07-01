import { auth } from "@/auth"
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from "@/components/ui/tooltip"


export async function UserName() {
   const user = await auth()

   return (
      <TooltipProvider>
         <Tooltip>
            <TooltipTrigger asChild>
               <p className="text-xs">{user?.user.username} | {user?.user.email}</p>
            </TooltipTrigger>
            <TooltipContent>
               <p className="text-xs">{user?.user.username} | {user?.user.email}</p>
            </TooltipContent>
         </Tooltip>
      </TooltipProvider>
   )
}