import type { Metadata } from "next";
import { Anton_SC } from "next/font/google";
import localFont from 'next/font/local'
import "./globals.css";
import 'remixicon/fonts/remixicon.css'

const fontPrimary = localFont({
  src: "./fonts/GothamBlack.otf",
  variable: "--font-primary",
  weight: "400",
  preload: true
});

export const metadata: Metadata = {
  title: "SAHARSHPNG",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className={`${fontPrimary.variable}`}>
        {children}
      </body>
    </html>
  );
}
