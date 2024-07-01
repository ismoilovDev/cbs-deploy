import * as React from "react"
import { Button } from "@/components/ui/button"
import { useMediaQuery } from "@/app/hooks/use-media-query"
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog"
import {
   Drawer,
   DrawerClose,
   DrawerContent,
   DrawerFooter,
   DrawerHeader,
   DrawerTitle,
} from "@/components/ui/drawer"

type Props = {
   children: React.ReactNode,
   isOpen: boolean,
   setIsOpen: (isOpen: boolean) => void;
   title: string
}

export function Modal({ children, isOpen, setIsOpen, title }: Props) {
   const isDesktop = useMediaQuery("(min-width: 768px)")

   if (isDesktop) {
      return (
         <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="">
               <DialogHeader>
                  <DialogTitle>{title}</DialogTitle>
               </DialogHeader>
               {children}
            </DialogContent>
         </Dialog>
      )
   }

   return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
         <DrawerContent>
            <DrawerHeader className="text-left">
               <DrawerTitle>JSHSHIR orqali mijozni yaratish</DrawerTitle>
            </DrawerHeader>
            {children}
            <DrawerFooter className="pt-2">
               <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
               </DrawerClose>
            </DrawerFooter>
         </DrawerContent>
      </Drawer>
   )
}
