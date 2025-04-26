import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuroraBackground } from "@/components/ui/aurora-background";
import NavBar from "@/components/NavBar";
import { HeroHighlight } from "@/components/ui/hero-highlight";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zeus Lightning",
  description: "",
};

export default function RootLayout({
  children,
  showAurora = true, // Adicione esta prop
}: Readonly<{
  children: React.ReactNode;
  showAurora?: boolean; // Nova prop
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <meta property="og:image" content="/Images/zeus-lightning.png" />
        <meta name="title" content="Zeus Lightning - Plataforma de Relatórios de Sistemas" />
        <meta name="keywords" content="Zeus Lightning, Relatórios, Sistemas, Plataforma, Análise de Dados" />
        <meta name="author" content="Zeus Lightning" />
        <meta name="description" content="Zeus Lightning - A poderosa plataforma de relatórios de sistemas" />
      </head>
      <body className={inter.className}>
        <NavBar />
        {showAurora ? (
          <AuroraBackground>{children}</AuroraBackground>
        ) : (
          <div className="min-h-screen bg-zinc-950">{children}</div>
        )}
      </body>
    </html>
  );
}