import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/assets/mode-toggle";
import { ProfileSettings } from "@/components/assets/profile-settings";
import { SidemenuToggle } from "@/components/assets/sidemenu-toggle";
import { UserName } from "@/components/assets/username";
import styles from '@/styles/layout.module.scss';
import Indicator from "@/components/assets/indicator";


export function Header() {
   return (
      <header className={cn(styles.navbar, "absolute w-full top-0 h-16 py-3 border bg-white dark:border-slate-50/[0.06] border-collapse dark:bg-slate-900 z-50")}>
         <div className="h-full flex justify-between items-center px-4">
            <div className="flex space-x-3 navbar-header basis-1/4 items-center">
               <SidemenuToggle />
               <Indicator />
            </div>
            <div className="app-settings flex space-x-4 items-center">
               <ModeToggle />
               <ProfileSettings />
            </div>
         </div>
      </header>
   )
}