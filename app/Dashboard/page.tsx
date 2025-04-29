"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiUser, FiFileText, FiUpload, FiMessageSquare, FiBarChart2, FiSettings, FiDownload, FiClock } from "react-icons/fi";
import { AuroraBackground } from "@/components/ui/aurora-background";

type User = {
  name: string;
  email: string;
  plan: string;
  storageUsed: number;
};

type Report = {
  id: string;
  title: string;
  date: string;
  downloadCount: number;
  fileSize: string;
};

type Upload = {
  id: string;
  fileName: string;
  date: string;
  status: "processing" | "completed" | "failed";
};

type Chat = {
  id: string;
  preview: string;
  date: string;
  fileUsed?: string;
};

export default function DashboardPage() {
  const [user] = useState<User>({
    name: "Carlos Silva",
    email: "carlos.silva@empresa.com",
    plan: "Premium",
    storageUsed: 3.2,
  });

  const [reports] = useState<Report[]>([
    {
      id: "1",
      title: "Relatório de Vendas Q1",
      date: "2023-04-15",
      downloadCount: 24,
      fileSize: "2.4 MB",
    },
    {
      id: "2",
      title: "Análise de Mercado",
      date: "2023-03-28",
      downloadCount: 42,
      fileSize: "1.8 MB",
    },
  ]);

  const [uploads] = useState<Upload[]>([
    {
      id: "1",
      fileName: "dados_vendas.xlsx",
      date: "2023-04-18 14:30",
      status: "completed",
    },
    {
      id: "2",
      fileName: "clientes.csv",
      date: "2023-04-17 09:15",
      status: "completed",
    },
  ]);

  const [chats] = useState<Chat[]>([
    {
      id: "1",
      preview: "Como posso melhorar o gráfico de vendas?",
      date: "2023-04-18 15:20",
      fileUsed: "dados_vendas.xlsx",
    },
    {
      id: "2",
      preview: "Quais são os principais insights dos dados?",
      date: "2023-04-17 10:30",
      fileUsed: "clientes.csv",
    },
  ]);

  const [activeTab, setActiveTab] = useState("overview");

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
                Dashboard completo
              </span>{" "}
              para análise e gestão dos seus{" "}
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
                      {reports.map((report) => (
                        <div key={report.id} className="flex justify-between items-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                          <div>
                            <h4 className="font-medium">{report.title}</h4>
                            <p className="text-sm text-gray-400 mt-1">
                              <FiClock className="inline mr-1" />
                              {new Date(report.date).toLocaleDateString('pt-BR')}
                            </p>
                          </div>
                          <button className="p-2 bg-cyan-600/30 hover:bg-cyan-500/40 rounded-full transition-colors">
                            <FiDownload className="text-cyan-400" />
                          </button>
                        </div>
                      ))}
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
                      {uploads.map((upload) => (
                        <div key={upload.id} className="flex justify-between items-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                          <div>
                            <h4 className="font-medium">{upload.fileName}</h4>
                            <p className="text-sm text-gray-400 mt-1">
                              <FiClock className="inline mr-1" />
                              {new Date(upload.date).toLocaleString('pt-BR')}
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
                          <td className="py-4 text-gray-400">{new Date(report.date).toLocaleDateString('pt-BR')}</td>
                          <td className="py-4 text-gray-400">{report.downloadCount}</td>
                          <td className="py-4 text-gray-400">{report.fileSize}</td>
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
                          <h3 className="font-medium">{upload.fileName}</h3>
                          <p className="text-sm text-gray-400 mt-1">
                            <FiClock className="inline mr-1" />
                            {new Date(upload.date).toLocaleString('pt-BR')}
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
                          {chat.fileUsed && (
                            <p className="text-sm text-gray-400 mt-1">
                              <FiFileText className="inline mr-1" />
                              Arquivo: {chat.fileUsed}
                            </p>
                          )}
                        </div>
                        <p className="text-sm text-gray-400">
                          {new Date(chat.date).toLocaleString('pt-BR')}
                        </p>
                      </div>
                      <button className="mt-3 text-sm text-cyan-400 hover:text-cyan-300">
                        Continuar conversa
                      </button>
                    </div>
                  ))}
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
                          {user.storageUsed} GB de 10 GB utilizados
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