"use client";

import { motion } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";
import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-black">
     <div className="z-1">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 sm:px-6 py-12 md:py-16 max-w-4xl"
      >
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <Link href="/" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6 transition-colors">
            <FiArrowLeft className="mr-2" /> Voltar
          </Link>
          
          <motion.h1 
            className="text-3xl xs:text-4xl sm:text-5xl font-bold text-white mb-3 sm:mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Termos de <span className="bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">Serviço</span>
          </motion.h1>
          <motion.p 
            className="text-sm sm:text-base md:text-lg text-zinc-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </motion.p>
        </div>

        {/* Conteúdo dos Termos */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 sm:p-8"
        >
          <div className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-white mb-4">1. Aceitação dos Termos</h2>
            <p className="text-zinc-300 mb-6">
              Ao acessar e utilizar o serviço Zeus Lightning, você concorda em cumprir estes Termos de Serviço e todas as leis e regulamentos aplicáveis. Se você não concordar com algum desses termos, está proibido de usar ou acessar este serviço.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4">2. Uso do Serviço</h2>
            <p className="text-zinc-300 mb-4">
              O Zeus Lightning fornece ferramentas para análise e geração de relatórios de sistemas. Você concorda em:
            </p>
            <ul className="text-zinc-300 mb-6 space-y-2 list-disc pl-5">
              <li>Usar o serviço apenas para fins legais</li>
              <li>Não violar qualquer restrição de uso</li>
              <li>Não reproduzir, duplicar ou explorar comercialmente qualquer parte do serviço</li>
              <li>Fornecer informações precisas e atualizadas</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mb-4">3. Contas e Registro</h2>
            <p className="text-zinc-300 mb-6">
              Para acessar certos recursos, você precisará criar uma conta. Você é responsável por manter a confidencialidade de suas credenciais e por todas as atividades que ocorram em sua conta.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4">4. Privacidade</h2>
            <p className="text-zinc-300 mb-6">
              Sua privacidade é importante para nós. Nossa Política de Privacidade explica como coletamos, usamos e protegemos suas informações pessoais. Ao usar nosso serviço, você concorda com a coleta e uso de informações de acordo com essa política.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4">5. Propriedade Intelectual</h2>
            <p className="text-zinc-300 mb-6">
              Todo o conteúdo, funcionalidades e tecnologia do Zeus Lightning são propriedade exclusiva da nossa empresa e estão protegidos por leis de direitos autorais e propriedade intelectual internacionais.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4">6. Limitação de Responsabilidade</h2>
            <p className="text-zinc-300 mb-6">
              Em nenhuma circunstância o Zeus Lightning será responsável por quaisquer danos diretos, indiretos, incidentais ou consequenciais resultantes do uso ou incapacidade de usar nosso serviço.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4">7. Modificações</h2>
            <p className="text-zinc-300 mb-6">
              Reservamos o direito de modificar estes termos a qualquer momento. Alterações significativas serão comunicadas com antecedência. O uso contínuo do serviço após tais modificações constitui sua aceitação dos novos termos.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4">8. Lei Aplicável</h2>
            <p className="text-zinc-300">
              Estes Termos serão regidos e interpretados de acordo com as leis do Brasil, sem considerar seus conflitos de princípios legais.
            </p>
          </div>

          <div className="mt-10 pt-6 border-t border-zinc-800">
            <h3 className="text-lg font-medium text-white mb-4">Dúvidas?</h3>
            <p className="text-zinc-300 mb-4">
              Se tiver qualquer dúvida sobre estes Termos de Serviço, entre em contato conosco.
            </p>
            <Link 
              href="/Contact" 
              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Fale conosco
            </Link>
          </div>
        </motion.div>
      </motion.div>
      </div>
    </main>
  );
}