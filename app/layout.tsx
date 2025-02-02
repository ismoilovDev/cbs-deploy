import { Metadata } from "next";
import { Inter, Roboto, Open_Sans } from "next/font/google";
import { Times } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/components/providers/auth-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import ReactQueryPvorider from "@/components/providers/react-query-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });
const open_sans = Open_Sans({ subsets: ["latin"], display: "swap" });
const roboto = Roboto({ weight: '400', subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IOI Core Banking System",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('min-h-screen dark:text-foreground', Times.variable, open_sans.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <ReactQueryPvorider>
              {children}
            </ReactQueryPvorider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
