"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiUser, FiFileText, FiUpload, FiMessageSquare, FiBarChart2, FiSettings, FiDownload, FiClock, FiAlertCircle } from "react-icons/fi";
import { supabase } from "@/lib/supabase";

type User = {
  id: string;
  name: string;
  email: string;
  plan: string;
  storage_used: number;
};

type Report = {
  id: string;
  title: string;
  created_at: string;
  download_count: number;
  file_size: string;
  user_id: string;
};

type Upload = {
  id: string;
  file_name: string;
  created_at: string;
  status: "processing" | "completed" | "failed";
  user_id: string;
};

type Chat = {
  id: string;
  preview: string;
  created_at: string;
  file_used?: string;
  user_id: string;
};

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [reports, setReports] = useState<Report[]>([]);
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError(null);
    
        // 1. Buscar usuário autenticado
        const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();
        
        if (authError) throw authError;
        if (!authUser) {
          window.location.href = '/login';
          return;
        }
    
        // 2. Buscar perfil - com tratamento para registro ausente
        const { data: userData, error: userError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authUser.id)
          .maybeSingle(); // Usando maybeSingle em vez de single
    
        if (userError) throw userError;
    
        // Se não existir perfil, criar um
        if (!userData) {
          const { error: createError } = await supabase
            .from('profiles')
            .upsert({
              id: authUser.id,
              name: authUser.email?.split('@')[0] || 'Usuário',
              email: authUser.email,
              plan: 'Free',
              storage_used: 0
            });
    
          if (createError) throw createError;
          
          // Buscar novamente após criação
          const { data: newUserData } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', authUser.id)
            .single();
    
          setUser({
            id: authUser.id,
            name: newUserData?.name || authUser.email?.split('@')[0] || 'Usuário',
            email: authUser.email || '',
            plan: newUserData?.plan || 'Free',
            storage_used: newUserData?.storage_used || 0
          });
        } else {
          setUser({
            id: authUser.id,
            name: userData.name || authUser.email?.split('@')[0] || 'Usuário',
            email: authUser.email || '',
            plan: userData.plan || 'Free',
            storage_used: userData.storage_used || 0
          });
        }
    
        // Restante do código para buscar reports, uploads, chats...
        
      } catch (error: any) {
        console.error("Erro detalhado:", error);
        setError(error.message || "Erro ao carregar dados. Por favor, tente novamente.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchUserData();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-black">
        <div className="text-center p-6 bg-red-900/30 rounded-lg max-w-md">
          <div className="flex items-center justify-center text-red-400 mb-3">
            <FiAlertCircle className="text-2xl mr-2" />
            <h3 className="text-xl font-semibold">Erro</h3>
          </div>
          <p className="text-red-300 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-full transition-colors"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500 mx-auto"></div>
          <p className="mt-4 text-gray-300">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-black">
        <div className="text-center">
          <p className="text-gray-300">Usuário não autenticado. Redirecionando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black">
      <div className="container mx-auto px-4 py-8">
        {/* Header no estilo Zeus Lightning */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.span 
            className="inline-block py-1.5 px-4 bg-gradient-to-r from-blue-900/40 to-emerald-900/40 backdrop-blur-md rounded-full text-white text-sm md:text-base border border-white/10 tracking-wide mb-4"
          >
            PAINEL DE CONTROLE
          </motion.span>
          
          <div className="space-y-2 mb-6">
            <h1 className="text-5xl md:text-7xl tracking-tighter bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-cyan-400 text-transparent font-bold leading-tight">
              Zeus
            </h1>
            <h2 className="text-5xl md:text-7xl tracking-tighter bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-500 text-transparent font-bold leading-tight">
              Lightning
            </h2>
          </div>
          
          <p className="text-gray-300/90 text-lg md:text-xl text-pretty leading-relaxed max-w-3xl mx-auto">
            <span className="bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent font-semibold">
              Bem-vindo, {user.name}
            </span>{" "}
            ao seu painel de análise e gestão de{" "}
            <span className="bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 text-transparent font-semibold">
              relatórios e dados
            </span>
          </p>
        </motion.header>

        {/* Abas de Navegação */}
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {[
            { id: "overview", icon: <FiBarChart2 />, label: "Visão Geral" },
            { id: "reports", icon: <FiFileText />, label: "Relatórios" },
            { id: "uploads", icon: <FiUpload />, label: "Envios" },
            { id: "chats", icon: <FiMessageSquare />, label: "Chats" },
            { id: "settings", icon: <FiSettings />, label: "Configurações" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-6 py-3 rounded-full transition-all ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/20"
                  : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </motion.nav>

        {/* Conteúdo Principal */}
        <div className="bg-gradient-to-br from-zinc-900/50 to-zinc-800/50 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
          {activeTab === "overview" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              {/* Cartões Estatísticos */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div 
                  whileHover={{ scale: 1.03 }}
                  className="bg-gradient-to-br from-blue-900/40 to-blue-800/40 border border-blue-500/20 rounded-xl p-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-blue-300">Plano Atual</h3>
                      <p className="text-2xl font-bold mt-2 text-white">{user.plan}</p>
                    </div>
                    <div className="p-3 bg-blue-600/20 rounded-full">
                      <FiUser className="text-blue-400 text-xl" />
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.03 }}
                  className="bg-gradient-to-br from-cyan-900/40 to-cyan-800/40 border border-cyan-500/20 rounded-xl p-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-cyan-300">Relatórios</h3>
                      <p className="text-2xl font-bold mt-2 text-white">{reports.length}</p>
                    </div>
                    <div className="p-3 bg-cyan-600/20 rounded-full">
                      <FiFileText className="text-cyan-400 text-xl" />
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.03 }}
                  className="bg-gradient-to-br from-emerald-900/40 to-emerald-800/40 border border-emerald-500/20 rounded-xl p-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-emerald-300">Chats</h3>
                      <p className="text-2xl font-bold mt-2 text-white">{chats.length}</p>
                    </div>
                    <div className="p-3 bg-emerald-600/20 rounded-full">
                      <FiMessageSquare className="text-emerald-400 text-xl" />
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Seções de Relatórios e Atividades */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <motion.div 
                  whileHover={{ scale: 1.01 }}
                  className="bg-white/5 rounded-xl p-6 border border-white/10"
                >
                  <h3 className="text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                    Relatórios Recentes
                  </h3>
                  <div className="space-y-4">
                    {reports.slice(0, 3).map((report) => (
                      <div key={report.id} className="flex justify-between items-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                        <div>
                          <h4 className="font-medium">{report.title}</h4>
                          <p className="text-sm text-gray-400 mt-1">
                            <FiClock className="inline mr-1" />
                            {new Date(report.created_at).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                        <button className="p-2 bg-cyan-600/30 hover:bg-cyan-500/40 rounded-full transition-colors">
                          <FiDownload className="text-cyan-400" />
                        </button>
                      </div>
                    ))}
                    {reports.length === 0 && (
                      <p className="text-gray-400 text-center py-4">Nenhum relatório encontrado</p>
                    )}
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.01 }}
                  className="bg-white/5 rounded-xl p-6 border border-white/10"
                >
                  <h3 className="text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                    Atividades Recentes
                  </h3>
                  <div className="space-y-4">
                    {uploads.slice(0, 3).map((upload) => (
                      <div key={upload.id} className="flex justify-between items-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                        <div>
                          <h4 className="font-medium">{upload.file_name}</h4>
                          <p className="text-sm text-gray-400 mt-1">
                            <FiClock className="inline mr-1" />
                            {new Date(upload.created_at).toLocaleString('pt-BR')}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          upload.status === "completed" 
                            ? "bg-emerald-900/30 text-emerald-400" 
                            : upload.status === "processing" 
                              ? "bg-blue-900/30 text-blue-400" 
                              : "bg-red-900/30 text-red-400"
                        }`}>
                          {upload.status === "completed" ? "Concluído" : upload.status === "processing" ? "Processando" : "Falhou"}
                        </span>
                      </div>
                    ))}
                    {uploads.length === 0 && (
                      <p className="text-gray-400 text-center py-4">Nenhum upload encontrado</p>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {activeTab === "reports" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  Meus Relatórios
                </h2>
                <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-full transition-colors shadow-lg shadow-blue-500/20">
                  Novo Relatório
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-white/10">
                      <th className="pb-4 text-blue-300">Título</th>
                      <th className="pb-4 text-blue-300">Data</th>
                      <th className="pb-4 text-blue-300">Downloads</th>
                      <th className="pb-4 text-blue-300">Tamanho</th>
                      <th className="pb-4 text-blue-300">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.map((report) => (
                      <tr key={report.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                        <td className="py-4 font-medium">{report.title}</td>
                        <td className="py-4 text-gray-400">{new Date(report.created_at).toLocaleDateString('pt-BR')}</td>
                        <td className="py-4 text-gray-400">{report.download_count}</td>
                        <td className="py-4 text-gray-400">{report.file_size}</td>
                        <td className="py-4">
                          <div className="flex space-x-2">
                            <button className="p-2 bg-cyan-600/30 hover:bg-cyan-500/40 rounded-full transition-colors">
                              <FiDownload className="text-cyan-400" />
                            </button>
                            <button className="p-2 bg-emerald-600/30 hover:bg-emerald-500/40 rounded-full transition-colors">
                              <FiMessageSquare className="text-emerald-400" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {reports.length === 0 && (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-gray-400">
                          Nenhum relatório encontrado
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === "uploads" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  Últimos Envios
                </h2>
                <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-full transition-colors shadow-lg shadow-blue-500/20">
                  Novo Upload
                </button>
              </div>

              <div className="space-y-4">
                {uploads.map((upload) => (
                  <div key={upload.id} className="flex justify-between items-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-cyan-600/20 rounded-lg">
                        <FiFileText className="text-cyan-400" />
                      </div>
                      <div>
                        <h3 className="font-medium">{upload.file_name}</h3>
                        <p className="text-sm text-gray-400 mt-1">
                          <FiClock className="inline mr-1" />
                          {new Date(upload.created_at).toLocaleString('pt-BR')}
                        </p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      upload.status === "completed" 
                        ? "bg-emerald-900/30 text-emerald-400" 
                        : upload.status === "processing" 
                          ? "bg-blue-900/30 text-blue-400" 
                          : "bg-red-900/30 text-red-400"
                    }`}>
                      {upload.status === "completed" ? "Concluído" : upload.status === "processing" ? "Processando" : "Falhou"}
                    </span>
                  </div>
                ))}
                {uploads.length === 0 && (
                  <p className="text-gray-400 text-center py-8">Nenhum upload encontrado</p>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === "chats" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                  Chats Recentes
                </h2>
                <button className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 rounded-full transition-colors shadow-lg shadow-emerald-500/20">
                  Novo Chat
                </button>
              </div>

              <div className="space-y-4">
                {chats.map((chat) => (
                  <div key={chat.id} className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">{chat.preview}</p>
                        {chat.file_used && (
                          <p className="text-sm text-gray-400 mt-1">
                            <FiFileText className="inline mr-1" />
                            Arquivo: {chat.file_used}
                          </p>
                        )}
                      </div>
                      <p className="text-sm text-gray-400">
                        {new Date(chat.created_at).toLocaleString('pt-BR')}
                      </p>
                    </div>
                    <button className="mt-3 text-sm text-cyan-400 hover:text-cyan-300">
                      Continuar conversa
                    </button>
                  </div>
                ))}
                {chats.length === 0 && (
                  <p className="text-gray-400 text-center py-8">Nenhum chat encontrado</p>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === "settings" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-6">
                Configurações
              </h2>

              <div className="space-y-6">
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-lg font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                    Informações da Conta
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Nome</label>
                      <input 
                        type="text" 
                        defaultValue={user.name}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Email</label>
                      <input 
                        type="email" 
                        defaultValue={user.email}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
                        disabled
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-lg font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                    Plano de Assinatura
                  </h3>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div>
                      <p className="text-xl font-bold">{user.plan}</p>
                      <p className="text-sm text-gray-400 mt-1">
                        {user.storage_used} GB de {user.plan === 'Premium' ? '50' : '10'} GB utilizados
                      </p>
                    </div>
                    <button className="mt-4 md:mt-0 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-full transition-colors shadow-lg shadow-blue-500/20">
                      Atualizar Plano
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}