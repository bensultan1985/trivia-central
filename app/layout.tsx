import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Trivia Train - Train Like a Champion",
  description:
    "A game show and trivia training app for people who want to win.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
          <div className="flex flex-col h-screen">
            <Header />
            <div className="flex flex-1 overflow-hidden">
              <Sidebar />
              <main className="flex-1 overflow-y-auto lg:ml-64">{children}</main>
            </div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
