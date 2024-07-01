import { Loader2 } from "lucide-react"
import {
   AlertDialog,
   AlertDialogContent,
} from "@/components/ui/alert-dialog"

type Props = {
   isOpen: boolean
}

export function SpinnerLoader({ isOpen }: Props) {
   return (
      <AlertDialog open={isOpen}>
         <AlertDialogContent className="w-auto bg-transparent border-none">
            <span>
               <Loader2 className="animate-spin" size={"40px"} />
            </span>
         </AlertDialogContent>
      </AlertDialog>
   )
}
