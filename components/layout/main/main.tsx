import React from "react";
import { Container } from "@/components/layout/container/container";
import { Header } from "@/components/layout/header/header";
import { Footer } from "@/components/layout/footer/footer";
import { Toaster } from "@/components/ui/toaster";

export function MainLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <main className="w-full h-screen relative overflow-y-auto">
         <Header />
         <Container>
            {children}
         </Container>
         <Footer />
         <Toaster />
      </main>
   )
}