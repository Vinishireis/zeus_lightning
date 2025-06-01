"use client";

import { useState, useEffect, JSX } from "react";
import { motion } from "framer-motion";
import { FiUser, FiFileText, FiUpload, FiMessageSquare, FiBarChart2, FiSettings, FiDownload, FiClock, FiAlertCircle, FiActivity } from "react-icons/fi";
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

type ActivityItem = {
  id: string;
  type: "chat" | "report" | "upload";
  title: string;
  description: string;
  timestamp: string;
  icon: JSX.Element;
  metadata?: any;
};

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [reports, setReports] = useState<Report[]>([]);
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);
  const [activityHistory, setActivityHistory] = useState<ActivityItem[]>([]);
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
    
        // 2. Buscar perfil
        const { data: userData, error: userError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authUser.id)
          .maybeSingle();
    
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
    
        // Buscar relatórios
        const { data: reportsData, error: reportsError } = await supabase
          .from('reports')
          .select('*')
          .eq('user_id', authUser.id)
          .order('created_at', { ascending: false });
        
        if (reportsError) throw reportsError;
        setReports(reportsData || []);
    
        // Buscar uploads
        const { data: uploadsData, error: uploadsError } = await supabase
          .from('uploads')
          .select('*')
          .eq('user_id', authUser.id)
          .order('created_at', { ascending: false });
        
        if (uploadsError) throw uploadsError;
        setUploads(uploadsData || []);
    
        // Buscar chats
        const { data: chatsData, error: chatsError } = await supabase
          .from('chats')
          .select('*')
          .eq('user_id', authUser.id)
          .order('created_at', { ascending: false });
        
        if (chatsError) throw chatsError;
        setChats(chatsData || []);
        
      } catch (error: any) {
        console.error("Erro detalhado:", error);
        setError(error.message || "Erro ao carregar dados. Por favor, tente novamente.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchUserData();
  }, []);

  // Criar histórico de atividades quando os dados são carregados
  useEffect(() => {
    if (user) {
      const activities: ActivityItem[] = [];
      
      // Adicionar chats ao histórico
      chats.forEach(chat => {
        activities.push({
          id: chat.id,
          type: "chat",
          title: "Chat criado",
          description: chat.preview,
          timestamp: chat.created_at,
          icon: <FiMessageSquare className="text-emerald-400" />,
          metadata: {
            fileUsed: chat.file_used
          }
        });
      });
      
      // Adicionar relatórios ao histórico
      reports.forEach(report => {
        activities.push({
          id: report.id,
          type: "report",
          title: "Relatório gerado",
          description: report.title,
          timestamp: report.created_at,
          icon: <FiFileText className="text-blue-400" />,
          metadata: {
            downloads: report.download_count,
            size: report.file_size
          }
        });
      });
      
      // Adicionar uploads ao histórico
      uploads.forEach(upload => {
        activities.push({
          id: upload.id,
          type: "upload",
          title: "Arquivo enviado",
          description: upload.file_name,
          timestamp: upload.created_at,
          icon: <FiUpload className="text-cyan-400" />,
          metadata: {
            status: upload.status
          }
        });
      });
      
      // Ordenar por timestamp (mais recente primeiro)
      activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      
      setActivityHistory(activities);
    }
  }, [chats, reports, uploads, user]);

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
  <main className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-gray-900 to-black px-4 sm:px-6 lg:px-8 min-w-[320px]">
    <div className="w-full max-w-[1920px] flex items-center justify-center z-1 py-8">
      <div className="w-full mx-auto px-4 pt-12 sm:px-6 lg:px-8">
        {/* Header no estilo Zeus Lightning */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12"
        >
          <p className="text-gray-300/90 text-base sm:text-lg md:text-xl text-pretty leading-relaxed max-w-3xl mx-auto">
            <span className="bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent font-semibold">
              Bem-vindo, {user.name}
            </span>{" "}
            ao seu painel de análise e gestão de{" "}
            <span className="bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 text-transparent font-semibold">
              relatórios e dados
            </span>
          </p>
        </motion.header>

        {/* Abas de Navegação - Ajustado para mobile */}
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-wrap justify-center gap-2 mb-6 sm:mb-8 overflow-x-auto py-2"
        >
          {[
            { id: "overview", icon: <FiBarChart2 />, label: "Visão Geral" },
            { id: "reports", icon: <FiFileText />, label: "Relatórios" },
            { id: "uploads", icon: <FiUpload />, label: "Envios" },
            { id: "chats", icon: <FiMessageSquare />, label: "Chats" },
            { id: "history", icon: <FiActivity />, label: "Histórico" },
            { id: "settings", icon: <FiSettings />, label: "Configurações" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-full transition-all text-sm sm:text-base ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/20"
                  : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
              }`}
            >
              <span className="mr-1 sm:mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </motion.nav>

        {/* Conteúdo Principal */}
        <div className="bg-gradient-to-br from-zinc-900/50 to-zinc-800/50 backdrop-blur-xl rounded-2xl border border-white/10 p-4 sm:p-6">
          {activeTab === "overview" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6 sm:space-y-8"
            >
              {/* Cartões Estatísticos - Ajuste para mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                <motion.div 
                  whileHover={{ scale: 1.03 }}
                  className="bg-gradient-to-br from-blue-900/40 to-blue-800/40 border border-blue-500/20 rounded-xl p-4 sm:p-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm sm:text-lg font-semibold text-blue-300">Plano Atual</h3>
                      <p className="text-xl sm:text-2xl font-bold mt-1 sm:mt-2 text-white">{user.plan}</p>
                    </div>
                    <div className="p-2 sm:p-3 bg-blue-600/20 rounded-full">
                      <FiUser className="text-blue-400 text-lg sm:text-xl" />
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.03 }}
                  className="bg-gradient-to-br from-cyan-900/40 to-cyan-800/40 border border-cyan-500/20 rounded-xl p-4 sm:p-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm sm:text-lg font-semibold text-cyan-300">Relatórios</h3>
                      <p className="text-xl sm:text-2xl font-bold mt-1 sm:mt-2 text-white">{reports.length}</p>
                    </div>
                    <div className="p-2 sm:p-3 bg-cyan-600/20 rounded-full">
                      <FiFileText className="text-cyan-400 text-lg sm:text-xl" />
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.03 }}
                  className="bg-gradient-to-br from-emerald-900/40 to-emerald-800/40 border border-emerald-500/20 rounded-xl p-4 sm:p-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm sm:text-lg font-semibold text-emerald-300">Chats</h3>
                      <p className="text-xl sm:text-2xl font-bold mt-1 sm:mt-2 text-white">{chats.length}</p>
                    </div>
                    <div className="p-2 sm:p-3 bg-emerald-600/20 rounded-full">
                      <FiMessageSquare className="text-emerald-400 text-lg sm:text-xl" />
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Seções de Relatórios e Atividades - Ajuste para mobile */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <motion.div 
                  whileHover={{ scale: 1.01 }}
                  className="bg-white/5 rounded-xl p-4 sm:p-6 border border-white/10"
                >
                  <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                    Relatórios Recentes
                  </h3>
                  <div className="space-y-3 sm:space-y-4">
                    {reports.slice(0, 3).map((report) => (
                      <div key={report.id} className="flex justify-between items-center p-3 sm:p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                        <div>
                          <h4 className="text-sm sm:text-base font-medium">{report.title}</h4>
                          <p className="text-xs sm:text-sm text-gray-400 mt-1">
                            <FiClock className="inline mr-1" />
                            {new Date(report.created_at).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                        <button className="p-1 sm:p-2 bg-cyan-600/30 hover:bg-cyan-500/40 rounded-full transition-colors">
                          <FiDownload className="text-cyan-400 text-sm sm:text-base" />
                        </button>
                      </div>
                    ))}
                    {reports.length === 0 && (
                      <p className="text-gray-400 text-center py-3 sm:py-4">Nenhum relatório encontrado</p>
                    )}
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.01 }}
                  className="bg-white/5 rounded-xl p-4 sm:p-6 border border-white/10"
                >
                  <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                    Atividades Recentes
                  </h3>
                  <div className="space-y-3 sm:space-y-4">
                    {activityHistory.slice(0, 3).map((activity) => (
                      <div key={activity.id} className="flex items-start p-3 sm:p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                        <div className="p-1 sm:p-2 mr-2 sm:mr-3 bg-white/10 rounded-lg">
                          {activity.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm sm:text-base font-medium">{activity.title}</h4>
                          <p className="text-xs sm:text-sm text-gray-400">{activity.description}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            <FiClock className="inline mr-1" />
                            {new Date(activity.timestamp).toLocaleString('pt-BR')}
                          </p>
                        </div>
                      </div>
                    ))}
                    {activityHistory.length === 0 && (
                      <p className="text-gray-400 text-center py-3 sm:py-4">Nenhuma atividade recente</p>
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
              className="space-y-4 sm:space-y-6"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3">
                <h2 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  Meus Relatórios
                </h2>
                <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-full transition-colors shadow-lg shadow-blue-500/20 text-sm sm:text-base">
                  Novo Relatório
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="text-left border-b border-white/10">
                      <th className="pb-3 sm:pb-4 text-blue-300 text-sm sm:text-base">Título</th>
                      <th className="pb-3 sm:pb-4 text-blue-300 text-sm sm:text-base">Data</th>
                      <th className="pb-3 sm:pb-4 text-blue-300 text-sm sm:text-base">Downloads</th>
                      <th className="pb-3 sm:pb-4 text-blue-300 text-sm sm:text-base">Tamanho</th>
                      <th className="pb-3 sm:pb-4 text-blue-300 text-sm sm:text-base">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.map((report) => (
                      <tr key={report.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                        <td className="py-3 sm:py-4 font-medium text-sm sm:text-base">{report.title}</td>
                        <td className="py-3 sm:py-4 text-gray-400 text-sm sm:text-base">{new Date(report.created_at).toLocaleDateString('pt-BR')}</td>
                        <td className="py-3 sm:py-4 text-gray-400 text-sm sm:text-base">{report.download_count}</td>
                        <td className="py-3 sm:py-4 text-gray-400 text-sm sm:text-base">{report.file_size}</td>
                        <td className="py-3 sm:py-4">
                          <div className="flex space-x-1 sm:space-x-2">
                            <button className="p-1 sm:p-2 bg-cyan-600/30 hover:bg-cyan-500/40 rounded-full transition-colors">
                              <FiDownload className="text-cyan-400 text-sm sm:text-base" />
                            </button>
                            <button className="p-1 sm:p-2 bg-emerald-600/30 hover:bg-emerald-500/40 rounded-full transition-colors">
                              <FiMessageSquare className="text-emerald-400 text-sm sm:text-base" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {reports.length === 0 && (
                      <tr>
                        <td colSpan={5} className="py-6 sm:py-8 text-center text-gray-400 text-sm sm:text-base">
                          Nenhum relatório encontrado
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Outras abas com ajustes similares... */}
          {activeTab === "uploads" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4 sm:space-y-6"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3">
                <h2 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  Últimos Envios
                </h2>
                <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-full transition-colors shadow-lg shadow-blue-500/20 text-sm sm:text-base">
                  Novo Upload
                </button>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {uploads.map((upload) => (
                  <div key={upload.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 sm:p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors gap-2 sm:gap-0">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className="p-2 sm:p-3 bg-cyan-600/20 rounded-lg">
                        <FiFileText className="text-cyan-400 text-sm sm:text-base" />
                      </div>
                      <div>
                        <h3 className="font-medium text-sm sm:text-base">{upload.file_name}</h3>
                        <p className="text-xs sm:text-sm text-gray-400 mt-1">
                          <FiClock className="inline mr-1" />
                          {new Date(upload.created_at).toLocaleString('pt-BR')}
                        </p>
                      </div>
                    </div>
                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
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
                  <p className="text-gray-400 text-center py-6 sm:py-8 text-sm sm:text-base">Nenhum upload encontrado</p>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === "chats" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4 sm:space-y-6"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3">
                <h2 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                  Chats Recentes
                </h2>
                <button className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 rounded-full transition-colors shadow-lg shadow-emerald-500/20 text-sm sm:text-base">
                  Novo Chat
                </button>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {chats.map((chat) => (
                  <div key={chat.id} className="p-3 sm:p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                    <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-0">
                      <div>
                        <p className="font-medium text-sm sm:text-base">{chat.preview}</p>
                        {chat.file_used && (
                          <p className="text-xs sm:text-sm text-gray-400 mt-1">
                            <FiFileText className="inline mr-1" />
                            Arquivo: {chat.file_used}
                          </p>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-gray-400">
                        {new Date(chat.created_at).toLocaleString('pt-BR')}
                      </p>
                    </div>
                    <button className="mt-2 sm:mt-3 text-xs sm:text-sm text-cyan-400 hover:text-cyan-300">
                      Continuar conversa
                    </button>
                  </div>
                ))}
                {chats.length === 0 && (
                  <p className="text-gray-400 text-center py-6 sm:py-8 text-sm sm:text-base">Nenhum chat encontrado</p>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === "history" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4 sm:space-y-6"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3">
                <h2 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  Histórico Completo
                </h2>
                <div className="flex items-center space-x-2">
                  <span className="text-xs sm:text-sm text-gray-400">Total: {activityHistory.length}</span>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {activityHistory.length > 0 ? (
                  <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
                    {activityHistory.map((activity) => (
                      <div 
                        key={activity.id} 
                        className="p-4 sm:p-5 border-b border-white/10 last:border-b-0 hover:bg-white/10 transition-colors"
                      >
                        <div className="flex items-start">
                          <div className="p-1 sm:p-2 mr-3 sm:mr-4 bg-white/10 rounded-lg">
                            {activity.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
                              <h3 className="font-medium text-sm sm:text-lg mb-1">{activity.title}</h3>
                              <span className="text-xs text-gray-500">
                                {new Date(activity.timestamp).toLocaleString('pt-BR')}
                              </span>
                            </div>
                            <p className="text-gray-300 text-xs sm:text-sm mb-2">{activity.description}</p>
                            
                            {activity.type === "report" && (
                              <div className="flex flex-wrap gap-1 sm:gap-2 mt-2">
                                <span className="text-xs px-2 py-1 bg-blue-900/30 text-blue-400 rounded-full">
                                  {activity.metadata.size}
                                </span>
                                <span className="text-xs px-2 py-1 bg-cyan-900/30 text-cyan-400 rounded-full">
                                  {activity.metadata.downloads} downloads
                                </span>
                              </div>
                            )}
                            
                            {activity.type === "upload" && (
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                activity.metadata.status === "completed" 
                                  ? "bg-emerald-900/30 text-emerald-400" 
                                  : activity.metadata.status === "processing" 
                                    ? "bg-blue-900/30 text-blue-400" 
                                    : "bg-red-900/30 text-red-400"
                              }`}>
                                {activity.metadata.status === "completed" ? "Concluído" : 
                                 activity.metadata.status === "processing" ? "Processando" : "Falhou"}
                              </span>
                            )}
                            
                            {activity.type === "chat" && activity.metadata.fileUsed && (
                              <span className="text-xs px-2 py-1 bg-emerald-900/30 text-emerald-400 rounded-full inline-flex items-center mt-2">
                                <FiFileText className="mr-1" /> {activity.metadata.fileUsed}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 sm:py-12">
                    <div className="mx-auto w-12 sm:w-16 h-12 sm:h-16 bg-white/10 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                      <FiActivity className="text-xl sm:text-2xl text-gray-400" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-medium text-gray-300 mb-2">Nenhuma atividade registrada</h3>
                    <p className="text-gray-500 text-sm sm:text-base">Seus relatórios, chats e uploads aparecerão aqui</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === "settings" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4 sm:space-y-6"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-4 sm:mb-6">
                Configurações
              </h2>

              <div className="space-y-4 sm:space-y-6">
                <div className="bg-white/5 rounded-xl p-4 sm:p-6 border border-white/10">
                  <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                    Informações da Conta
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm text-gray-400 mb-1">Nome</label>
                      <input 
                        type="text" 
                        defaultValue={user.name}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 sm:px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white text-sm sm:text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm text-gray-400 mb-1">Email</label>
                      <input 
                        type="email" 
                        defaultValue={user.email}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 sm:px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white text-sm sm:text-base"
                        disabled
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-4 sm:p-6 border border-white/10">
                  <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                    Plano de Assinatura
                  </h3>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 sm:gap-0">
                    <div>
                      <p className="text-lg sm:text-xl font-bold">{user.plan}</p>
                      <p className="text-xs sm:text-sm text-gray-400 mt-1">
                        {user.storage_used} GB de {user.plan === 'Premium' ? '50' : '10'} GB utilizados
                      </p>
                    </div>
                    <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-full transition-colors shadow-lg shadow-blue-500/20 text-sm sm:text-base">
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
  </main>
);
}