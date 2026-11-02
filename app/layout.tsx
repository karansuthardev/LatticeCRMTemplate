import type { Metadata } from "next";
import "./globals.css";

import { GeistSans } from "geist/font/sans";
import { GeistSerif } from "geist/font/serif";
import Navbar from "./components/navbar";
import Footer from "./footer";

export const metadata: Metadata = {
  title: "Lattice",
  description: "NextGen CRM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistSerif.variable} h-full antialiased font-sans`}
    >
      <body className="relative flex min-h-full flex-col bg-zinc-100 scrollbar-none selection:bg-orange-100 selection:text-orange-950">
        <Navbar />
        <div className="flex flex-1 flex-col w-full">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
