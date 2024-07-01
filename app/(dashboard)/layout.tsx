import React from "react";
import { Sidebar } from "@/components/layout/sidebar/sidebar";
import { MainLayout } from "@/components/layout/main/main";

export default function DashboardLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <div className="w-full h-screen grid grid-cols-[max-content_auto]">
         <Sidebar />
         <MainLayout>
            {children}
         </MainLayout>
      </div>
   )
}