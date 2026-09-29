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
const gambetta = localFont({
  src: [
    {
      path: "./fonts/Gambetta-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/Gambetta-LightItalic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "./fonts/Gambetta-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Gambetta-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/Gambetta-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Gambetta-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "./fonts/Gambetta-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/Gambetta-SemiboldItalic.woff2",
      weight: "600",
      style: "italic",
    },
    {
      path: "./fonts/Gambetta-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Gambetta-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-gambetta",
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
      className={`${generalSans.className} ${generalSans.variable} ${gambetta.variable}  h-full antialiased`}
    >
      <body className="relative flex min-h-full flex-col bg-zinc-100 scrollbar-none selection:bg-indigo-100 selection:text-indigo-950">
        <Navbar />
        <div className="min-h-screen w-full">{children}</div>
      </body>
    </html>
  );
}
