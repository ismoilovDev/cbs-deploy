import { ReactNode } from "react";
import styles from '@/styles/layout.module.scss'
import { cn } from "@/lib/utils";

export default function ContentCard({ classes, children }: { classes?: string, children: ReactNode }) {
   return (
      <div className={cn(styles.content_card, 'bg-white dark:bg-slate-900/75')}>
         <div className={cn("p-5", classes)}>
            {children}
         </div>
      </div>
   )
}
