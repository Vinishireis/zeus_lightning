"use client";

import { AuroraBackground } from "@/components/aurora-background";
import { motion } from "framer-motion";
import { FiBarChart2, FiCpu, FiDatabase, FiShield, FiCode, FiUsers } from "react-icons/fi";

export default function SolutionsPage() {
  const features = [
    {
      icon: <FiBarChart2 className="w-6 h-6" />,
      title: "Análise Avançada",
      description: "Relatórios detalhados com visualizações interativas para melhor compreensão dos dados."
    },
    {
      icon: <FiCpu className="w-6 h-6" />,
      title: "Processamento Rápido",
      description: "Tecnologia de ponta para processar grandes volumes de dados em segundos."
    },
    {
      icon: <FiDatabase className="w-6 h-6" />,
      title: "Armazenamento Seguro",
      description: "Seus dados protegidos com criptografia de última geração e backups regulares."
    },
    {
      icon: <FiShield className="w-6 h-6" />,
      title: "Conformidade",
      description: "Totalmente compatível com LGPD e GDPR para proteger sua empresa e clientes."
    },
    {
      icon: <FiCode className="w-6 h-6" />,
      title: "API Integrada",
      description: "Conecte-se facilmente com seus sistemas existentes através de nossa API RESTful."
    },
    {
      icon: <FiUsers className="w-6 h-6" />,
      title: "Colaboração",
      description: "Compartilhe relatórios e dashboards com sua equipe de forma segura e controlada."
    }
  ];

  const industries = [
    {
      name: "Finanças",
      description: "Análise de transações, detecção de fraudes e relatórios regulatórios."
    },
    {
      name: "Saúde",
      description: "Processamento de dados médicos e geração de insights para melhor atendimento."
    },
    {
      name: "Varejo",
      description: "Análise de comportamento do consumidor e otimização de estoque."
    },
    {
      name: "Educação",
      description: "Acompanhamento de desempenho estudantil e análise pedagógica."
    }
  ];

  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-16 max-w-6xl"
      >
        {/* Hero Section */}
        <div className="text-center mb-20">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Potencialize seus dados com <span className="bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">Zeus Lightning</span>
          </motion.h1>
          <motion.p 
            className="text-lg text-zinc-400 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Transforme dados brutos em insights acionáveis com nossa plataforma de análise inteligente e geração automática de relatórios.
          </motion.p>
        </div>

        {/* Features */}
        <div className="mb-20">
          <motion.h2 
            className="text-3xl font-bold text-white mb-10 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Nossas Soluções
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-blue-900/30 border border-blue-800/50 flex items-center justify-center text-blue-400 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-zinc-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Industries */}
        <div>
          <motion.h2 
            className="text-3xl font-bold text-white mb-10 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Setores que atendemos
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {industries.map((industry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-gradient-to-br from-zinc-900/50 to-zinc-800/30 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-all duration-300"
              >
                <h3 className="text-2xl font-bold text-white mb-3 bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text">
                  {industry.name}
                </h3>
                <p className="text-zinc-400">{industry.description}</p>
                <button className="mt-4 text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center transition-colors">
                  Saiba mais →
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div 
          className="mt-20 bg-gradient-to-r from-blue-900/50 to-indigo-900/50 border border-blue-800/30 rounded-2xl p-8 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Pronto para transformar seus dados?</h2>
          <p className="text-zinc-300 mb-6 max-w-2xl mx-auto">
            Comece agora mesmo com nossa plataforma ou agende uma demonstração com nossos especialistas.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-lg font-medium transition-all duration-200">
              Começar Agora
            </button>
            <button className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white rounded-lg font-medium transition-all duration-200">
              Agendar Demonstração
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AuroraBackground>
  );
}