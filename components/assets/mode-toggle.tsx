'use client'

import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

export function ModeToggle() {
   const { theme, setTheme } = useTheme()

   return (
      <Button
         size="icon"
         variant="ghost"
         aria-label="O'zgartirish"
         onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
         <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
         <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </Button>
   )
}