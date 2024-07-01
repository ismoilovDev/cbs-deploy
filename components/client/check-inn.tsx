'use client'

import * as React from "react"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { cn } from "@/lib/utils"
import { ClientCheckSchema } from "@/schemas"
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
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { SpinnerLoader } from "@/components/assets/spinner-loader"

const defaultValues = {
  jshshr: "",
  passport_details: ""
}

type ProfileFormProps = {
  setIsCheckedClient: (isChecked: boolean) => void;
  setIsOpen: (isOpen: boolean) => void;
  className?: string;
};


export function CheckInn({ setIsCheckedClient }: { setIsCheckedClient: (isChecked: boolean) => void }) {
  const [isOpen, setIsOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <>
        <Dialog open={true}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>JSHSHIR orqali mijozni yaratish</DialogTitle>
            </DialogHeader>
            <ProfileForm setIsCheckedClient={setIsCheckedClient} setIsOpen={setIsOpen} />
          </DialogContent>
        </Dialog>
        <SpinnerLoader isOpen={isOpen} />
      </>
    )
  }

  return (
    <Drawer open={true}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>JSHSHIR orqali mijozni yaratish</DrawerTitle>
        </DrawerHeader>
        <ProfileForm setIsCheckedClient={setIsCheckedClient} setIsOpen={setIsOpen} className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function ProfileForm({ setIsCheckedClient, className, setIsOpen }: ProfileFormProps) {
  const [isPending, startTransition] = React.useTransition();

  const form = useForm<z.infer<typeof ClientCheckSchema>>({
    resolver: zodResolver(ClientCheckSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = (values: z.infer<typeof ClientCheckSchema>) => {
    setIsOpen(true)
    setTimeout(() => {
      startTransition(() => {
        setIsCheckedClient(true)
        setIsOpen(false)
      })
    }, 3000)
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("grid items-start gap-4", className)}>
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="jshshir"
            render={({ field }) => (
              <FormItem>
                <FormLabel>JSHSHIR</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="51408994454454"
                    type="number"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="passport_details"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Passport seriya va raqam</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="KA1235487"
                    defaultValue={'KA1235487'}
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Qidirish</Button>
      </form>
    </Form>
  )
}
