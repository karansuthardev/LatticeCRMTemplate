import type { Metadata } from "next";
import "./globals.css";

import localFont from "next/font/local";
import Navbar from "./components/navbar";

const generalSans = localFont({
  src: [
    {
      path: "./fonts/GeneralSans-Extralight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/GeneralSans-ExtralightItalic.woff2",
      weight: "200",
      style: "italic",
    },
    {
      path: "./fonts/GeneralSans-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/GeneralSans-LightItalic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "./fonts/GeneralSans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/GeneralSans-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/GeneralSans-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/GeneralSans-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "./fonts/GeneralSans-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/GeneralSans-SemiboldItalic.woff2",
      weight: "600",
      style: "italic",
    },
    {
      path: "./fonts/GeneralSans-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/GeneralSans-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-general-sans",
});
const merriweather = localFont({
  src: [
    {
      path: "./fonts/Merriweather-VariableFont_opsz,wdth,wght.woff2",
      style: "normal",
    },
    {
      path: "./fonts/Merriweather-Italic-VariableFont_opsz,wdth,wght.woff2",
      style: "italic",
    },
  ],
  variable: "--font-merriweather",
});

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
      className={`${generalSans.className} ${generalSans.variable} ${merriweather.variable} h-full antialiased`}
    >
      <body className="relative flex min-h-full flex-col bg-zinc-100 scrollbar-none selection:bg-orange-100 selection:text-orange -950">
        <Navbar />
        <div className="flex flex-1 flex-col w-full">{children}</div>
      </body>
    </html>
  );
}
