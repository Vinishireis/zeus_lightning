"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";

// Importa dinamicamente framer-motion
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
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Verifica sessão atual e redireciona se necessário
  useEffect(() => {
    setIsClient(true);

    if (!loading && user) {
      const redirectUrl = searchParams?.get("callbackUrl");
      if (redirectUrl) {
        router.push(redirectUrl);
      }
    }
  }, [user, searchParams, router, loading]);

  // Verifica sessão atual e escuta mudanças de autenticação
  useEffect(() => {
    let mounted = true;

    const checkSession = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();
        if (error) throw error;
        if (mounted && session) setUser(session.user);
      } catch (error) {
        console.error("Erro ao checar sessão:", error);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      setUser(session?.user || null);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Navegação protegida com verificação de sessão
  const handleProtectedNavigation = async (path: string) => {
    setIsNavigating(true);
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push(`/Login?callbackUrl=${encodeURIComponent(path)}`);
      } else {
        router.push(path);
      }
    } catch (error) {
      console.error("Erro na navegação:", error);
    } finally {
      setIsNavigating(false);
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

  const features = [
    { text: "Ecossistema", subtext: "ESG", color: "text-cyan-400" },
    { text: "Relatórios", subtext: "personalizados", color: "text-emerald-400" },
    { text: "Integração", subtext: "simplificada", color: "text-blue-400", span: "col-span-2 sm:col-span-1" },
    { text: "Aderente", subtext: "ao IFRS", color: "text-blue-500", span: "col-span-2 sm:col-span-1" },
  ];

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-gray-900 to-black px-4 sm:px-6 lg:px-8 min-w-[320px]">
      <div className="text-center w-full max-w-2xl mx-auto space-y-6 sm:space-y-8 lg:space-y-10 py-8 sm:py-12 lg:py-16">
        {/* ... (resto da interface permanece igual) */}
        {/* Botões, textos, e features renderizados dinamicamente com animação */}
        {/* Mantém-se toda a parte visual que você já construiu corretamente */}
      </div>
    </main>
  );
}
