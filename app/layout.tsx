import { MainNav } from "@/components/layout/MainNav";
import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { CollapsibleSidebar } from "@/components/layout/CollapsibleSidebar";
import { Footer } from "@/components/layout/footer/Footer";
import { Toaster } from "@/components/ui/toaster";
// import ContextProvider from '@/contexts/providers/ContextProvider';
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { NotificationService } from "@/components/layout/toast-notification/NotificationService";
import { HeroHighlight } from "@/components/ui/hero-highlight";
import WalletProviders from "@/contexts/providers/wallet-provider";
// import { LoadingProvider } from '@/components/loading-provider';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SolanaLearn - Master Solana Development",
  description:
    "Master Solana development through interactive courses, earn NFTs for completing challenges, and practice with real test cases",
  icons: {
    icon: "/imgs/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <WalletProviders>
          <ThemeProvider
            attribute="class"
            defaultTheme={"system"}
            enableSystem
            disableTransitionOnChange
          >
            <TooltipProvider>
              <div className="min-h-screen flex flex-col bg-background">
                <MainNav />
                <HeroHighlight containerClassName="min-h-screen">
                  <div className="flex-1 flex pt-16">
                    {" "}
                    <CollapsibleSidebar />
                    <main className="flex justify-center flex-1">
                      {children}
                    </main>
                  </div>
                </HeroHighlight>
                <NotificationService />
                <Footer />
              </div>
              <Toaster />
            </TooltipProvider>
          </ThemeProvider>
        </WalletProviders>
      </body>
    </html>
  );
}
