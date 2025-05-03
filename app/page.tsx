"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
      }
      setLoading(false);
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      if (session) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    });

    return () => subscription?.unsubscribe();
  }, []);

  const handleProtectedNavigation = (path: string) => {
    if (!user) {
      router.push(`/Login?redirect=${encodeURIComponent(path)}`);
    } else {
      router.push(path);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen w-full flex items-center justify-center bg-black">
        <div className="text-center">
          <p className="text-white">Carregando...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-gray-900 to-black px-4 sm:px-6">
      {/* Content Container */}
      <div className="text-center w-full max-w-2xl mx-auto space-y-6 sm:space-y-8 py-12">
        
        {/* Headings with Better Mobile Scaling */}
        <motion.div 
          className="space-y-2 sm:space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl tracking-tight bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-cyan-400 text-transparent font-bold leading-tight">
            Zeus
          </h1>
          <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl tracking-tight bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-500 text-transparent font-bold leading-tight">
            Lightning
          </h2>
        </motion.div>

        {/* Optimized Description */}
        <motion.p
          className="text-gray-300/90 text-base sm:text-lg md:text-xl leading-relaxed mx-auto px-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
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
            </span>.
        </motion.p>

        {/* Responsive Buttons */}
        <motion.div
          className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center pt-4 sm:pt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Button 
            size="lg"
            className="rounded-full px-6 sm:px-8 py-5 text-sm sm:text-base bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg shadow-blue-500/20"
            onClick={() => handleProtectedNavigation("/Chat")}
          >
            Gerar Relatórios
          </Button>
          <Button 
            variant="secondary"
            size="lg"
            className="rounded-full px-6 sm:px-8 py-5 text-sm sm:text-base border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-lg transition-all"
            onClick={() => handleProtectedNavigation("/Dashboard")}
          >
            Acessar Dashboard
          </Button>
        </motion.div>

        {/* Features Grid - Mobile Optimized */}
        <motion.div
          className="grid grid-cols-2 gap-3 sm:gap-4 pt-6 sm:pt-8 max-w-xs sm:max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          {[
            { text: "Ecossistema", subtext: "ESG", color: "text-cyan-400" },
            { text: "Relatórios", subtext: "personalizados", color: "text-emerald-400" },
            { text: "Integração", subtext: "simplificada", color: "text-blue-400", span: "col-span-2 sm:col-span-1" },
            { text: "Aderente", subtext: "ao IFRS", color: "text-blue-500", span: "col-span-2 sm:col-span-1" }
          ].map((item, index) => (
            <div 
              key={index}
              className={`${item.span || ""} bg-white/5 p-3 sm:p-4 rounded-lg border border-white/10 hover:border-white/20 transition-all flex flex-col items-center justify-center min-h-[80px]`}
            >
              <span className={`${item.color} font-medium text-sm sm:text-base`}>{item.text}</span>
              <span className="text-gray-300 text-xs sm:text-sm mt-1">{item.subtext}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}