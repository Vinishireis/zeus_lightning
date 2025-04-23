import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuroraBackground } from "@/components/aurora-background";
import NavBar from "@/components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zeus Lightning",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar></NavBar>
        <AuroraBackground>{children}</AuroraBackground>
      </body>
    </html>
  );
}