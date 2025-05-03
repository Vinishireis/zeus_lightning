"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

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
      <main className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
        <div className="text-center">
          <p className="text-white text-lg font-medium animate-pulse">Carregando...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
      <div className="text-center space-y-8 max-w-2xl z-10 px-6">
        {/* Headings */}
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl tracking-tighter bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-cyan-400 text-transparent font-extrabold leading-tight">
            Zeus
          </h1>
          <h2 className="text-6xl md:text-8xl tracking-tighter bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-500 text-transparent font-extrabold leading-tight">
            Lightning
          </h2>
        </div>

        {/* Description */}
        <p className="text-gray-300/90 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
          Zeus Lightning estrutura um{" "}
          <span className="bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent font-semibold">
            ecossistema completo
          </span>{" "}
          para que empresas, investidores e instituições de benfeitorias unam-se para cumprir as normas da{" "}
          <span className="bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 text-transparent font-semibold">
            ESG
          </span>{" "}
          e transparecer o impacto da empresa na sociedade. Um sistema que conta com{" "}
          <span className="bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent font-semibold">
            relatórios customizáveis
          </span>{" "}
          e análise de dados inteligente.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          <Button 
            size="lg" 
            className="rounded-full px-10 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg shadow-blue-500/30 cursor-pointer text-white font-semibold text-lg"
            onClick={() => handleProtectedNavigation("/Chat")}
          >
            Gerar Relatórios
          </Button>
          <Button 
            variant="secondary" 
            size="lg" 
            className="rounded-full px-10 py-4 border-white/20 bg-white/10 hover:bg-white/20 backdrop-blur-lg transition-all duration-300 cursor-pointer text-white font-semibold text-lg"
            onClick={() => handleProtectedNavigation("/Dashboard")}
          >
            Acessar Dashboard
          </Button>
        </div>

        {/* Destaques */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-4 pt-8 text-sm sm:text-base">
          {/* Item 1 - Eficiência */}
          <div className="bg-white/10 p-4 sm:p-5 rounded-lg border border-white/20 flex items-center justify-center">
            <span className="text-cyan-400 font-medium">Ecossistema</span>
            <span className="ml-2 text-gray-300">ESG</span>
          </div>

          {/* Item 2 - Relatórios */}
          <div className="bg-white/10 p-4 sm:p-5 rounded-lg border border-white/20 flex items-center justify-center">
            <span className="text-emerald-400 font-medium">Relatórios</span>
            <span className="ml-2 text-gray-300">personalizados</span>
          </div>

          {/* Item 3 - Integração */}
          <div className="bg-white/10 p-4 sm:p-5 rounded-lg border border-white/20 col-span-2 sm:col-span-1 flex items-center justify-center">
            <span className="text-blue-400 font-medium">Integração</span>
            <span className="ml-2 text-gray-300">simplificada</span>
          </div>

          {/* Item 4 - IFRS */}
          <div className="bg-white/10 p-4 sm:p-5 rounded-lg border border-white/20 col-span-2 sm:col-span-1 flex items-center justify-center">
            <span className="text-blue-500 font-medium">Aderente</span>
            <span className="ml-2 text-gray-300">ao IFRS</span>
          </div>
        </div>
      </div>
    </main>
  );
}