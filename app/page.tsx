"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// Carregar componentes pesados de forma dinâmica
const MotionDiv = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.div),
  {
    ssr: false,
    loading: () => <div />,
  }
);

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    let mounted = true;

    const checkSession = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();
        if (!mounted) return;

        if (error) throw error;

        if (session) {
          setUser(session.user);
        }
      } catch (error) {
        console.error("Session check error:", error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;
      setUser(session?.user || null);
      if (!loading && event === "SIGNED_OUT") {
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, [loading]);

  const handleProtectedNavigation = (path: string) => {
    if (!user) {
      router.push(`/Login?redirect=${encodeURIComponent(path)}`);
    } else {
      router.push(path);
    }
  };

  if (!isClient || loading) {
    return (
      <main className="min-h-screen w-full flex items-center justify-center bg-black">
        <div className="text-center">
          <p className="text-white">Carregando...</p>
        </div>
      </main>
    );
  }

  // Dados reutilizáveis para features
  const features = [
    { text: "Ecossistema", subtext: "ESG", color: "text-cyan-400" },
    {
      text: "Relatórios",
      subtext: "personalizados",
      color: "text-emerald-400",
    },
    {
      text: "Integração",
      subtext: "simplificada",
      color: "text-blue-400",
      span: "col-span-2 sm:col-span-1",
    },
    {
      text: "Aderente",
      subtext: "ao IFRS",
      color: "text-blue-500",
      span: "col-span-2 sm:col-span-1",
    },
  ];

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-gray-900 to-black px-4 sm:px-6 lg:px-8 min-w-[320px]">
      {/* Content Container */}
      <div className="text-center w-full max-w-2xl mx-auto space-y-6 sm:space-y-8 lg:space-y-10 py-8 sm:py-12 lg:py-16">
        {/* Headings with Universal Mobile Support */}
        <MotionDiv
          className="space-y-1 xs:space-y-1.5 sm:space-y-2 md:space-y-3"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl tracking-tight bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-cyan-400 text-transparent font-bold">
            Zeus
          </h1>
          <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl tracking-tight bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-500 text-transparent font-bold">
            Lightning
          </h2>
        </MotionDiv>

        {/* Optimized Description */}
        <MotionDiv
          className="text-gray-300/90 text-base sm:text-lg md:text-xl leading-relaxed mx-auto px-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <span className="bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent font-medium">
            Ecossistema completo
          </span>{" "}
          para ajudar empresas a cumprir normas da{" "}
          <span className="bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 text-transparent font-medium">
            ESG
          </span>{" "}
          e mostrar seu impacto na sociedade.{" "}
          <span className="bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent font-medium">
            Inclui relatórios customizáveis e análise de dados inteligente
          </span>
          .
        </MotionDiv>

        {/* Responsive Buttons */}
        <MotionDiv
          className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center pt-4 sm:pt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <Button
            size="lg"
            className="rounded-full px-6 sm:px-8 py-5 text-sm sm:text-base bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition-all cursor-pointer !important shadow-lg shadow-blue-500/20 hover:cursor-pointer"
            onClick={() => handleProtectedNavigation("/Chat")}
          >
            Gerar Relatórios
          </Button>

          <Button
            variant="secondary"
            size="lg"
            className="rounded-full px-6 sm:px-8 py-5 text-sm sm:text-base border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-lg transition-all cursor-pointer hover:cursor-pointer"
            onClick={() => handleProtectedNavigation("/Dashboard")}
          >
            Acessar Dashboard
          </Button>
        </MotionDiv>

        {/* Features Grid - Mobile Optimized */}
        <MotionDiv
          className="grid grid-cols-2 gap-2 sm:gap-4 pt-4 sm:pt-8 max-w-xs sm:max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          {features.map((item, index) => (
            <div
              key={index}
              className={`${item.span || ""} 
                bg-white/5 p-2 sm:p-4 rounded-md sm:rounded-lg 
                border border-white/10 hover:border-white/20 
                transition-all flex flex-col items-center justify-center 
                min-h-[60px] sm:min-h-[80px] cursor-default`}
            >
              <span
                className={`${item.color} font-medium text-xs sm:text-base`}
              >
                {item.text}
              </span>
              <span className="text-gray-300 text-[0.65rem] sm:text-sm mt-0.5">
                {item.subtext}
              </span>
            </div>
          ))}
        </MotionDiv>
      </div>
    </main>
  );
}