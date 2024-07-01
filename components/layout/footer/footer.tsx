import { cn } from "@/lib/utils";
import { UserName } from "@/components/assets/username";
import styles from '@/styles/layout.module.scss'
import SignDate from "@/components/assets/sign-date";

export function Footer() {

   return (
      <footer id="footer" className={cn(styles.footer, "absolute w-full bottom-0 h-8 border bg-white dark:border-slate-50/[0.06] border-collapse dark:bg-slate-900 z-50")}>
         <div className="flex h-full px-3 justify-end items-center space-x-2">
            <SignDate />
            <UserName />
         </div>
      </footer>
   )
}