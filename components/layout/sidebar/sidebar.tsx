'use client';

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import SidemenuNav from "./menu/sidemenu-nav";
import SidemenuSettings from "./menu/sidemenu-settings";
import styles from '@/styles/layout.module.scss';
import { Logo } from "@/components/assets/logo";

const [minWidth, maxWidth, defaultWidth] = [200, 500, 350];

export function Sidebar() {
   const [width, setWidth] = useState(
      parseInt(localStorage.getItem("sidebarWidth") || "") || defaultWidth
   );
   const isResized = useRef(false);

   useEffect(() => {
      window.addEventListener("mousemove", (e) => {
         if (!isResized.current) {
            return;
         }

         setWidth((previousWidth) => {
            const newWidth = previousWidth + e.movementX / 2;

            const isWidthInRange = newWidth >= minWidth && newWidth <= maxWidth;

            return isWidthInRange ? newWidth : previousWidth;
         });
      });

      window.addEventListener("mouseup", () => {
         isResized.current = false;
      });
   }, []);

   useEffect(() => {
      localStorage.setItem("sidebarWidth", width.toString());
   }, [width]);

   return (
      <aside id="sidebar_wrap" className={cn(styles.sidebar_wrap, 'flex border bg-white dark:border-slate-50/[0.06] dark:bg-slate-900/75 border-collapse')}>
         <div style={{ width: `${width / 16}rem` }}>
            <div className="flex basis-1/4 space-x-4 items-center">
               <Logo />
            </div>
            <div id="sidebar" className={'w-full h-[calc(100vh-4rem)] flex flex-col justify-between pl-2'}>
               <SidemenuNav />
               <SidemenuSettings />
            </div>
         </div>
         <div
            className="w-3 cursor-col-resize"
            onMouseDown={() => {
               isResized.current = true;
            }}
         />
      </aside>
   )
}