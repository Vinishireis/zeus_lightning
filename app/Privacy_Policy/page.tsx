"use client";

import { motion } from "framer-motion";
import { FiArrowLeft, FiShield, FiLock, FiDatabase, FiUser } from "react-icons/fi";
import Link from "next/link";

export default function PrivacyPolicyPage() {
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
            Política de <span className="bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">Privacidade</span>
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

        {/* Conteúdo da Política */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 sm:p-8"
        >
          <div className="prose prose-invert max-w-none">
            <div className="flex items-center mb-6">
              <FiShield className="w-8 h-8 text-blue-400 mr-3" />
              <p className="text-zinc-300">
                Na Zeus Lightning, levamos sua privacidade a sério. Esta política explica como coletamos, usamos e protegemos suas informações.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <FiUser className="mr-2 text-blue-400" /> 1. Informações que Coletamos
            </h2>
            <p className="text-zinc-300 mb-4">
              Podemos coletar os seguintes tipos de informações quando você usa nosso serviço:
            </p>
            <ul className="text-zinc-300 mb-6 space-y-2 list-disc pl-5">
              <li>Informações de cadastro (nome, e-mail, empresa)</li>
              <li>Dados de uso do serviço (logs, relatórios gerados)</li>
              <li>Informações técnicas (endereço IP, tipo de navegador)</li>
              <li>Dados de pagamento (para planos premium)</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <FiDatabase className="mr-2 text-blue-400" /> 2. Como Usamos Suas Informações
            </h2>
            <p className="text-zinc-300 mb-4">
              Utilizamos suas informações para:
            </p>
            <ul className="text-zinc-300 mb-6 space-y-2 list-disc pl-5">
              <li>Fornecer e melhorar nossos serviços</li>
              <li>Personalizar sua experiência</li>
              <li>Processar transações</li>
              <li>Comunicar atualizações e ofertas</li>
              <li>Cumprir obrigações legais</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <FiLock className="mr-2 text-blue-400" /> 3. Proteção de Dados
            </h2>
            <p className="text-zinc-300 mb-6">
              Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações contra acesso não autorizado, alteração ou destruição. Todos os dados são criptografados em trânsito e em repouso.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4">4. Compartilhamento de Informações</h2>
            <p className="text-zinc-300 mb-6">
              Não vendemos nem alugamos seus dados pessoais. Podemos compartilhar informações apenas com:
              <br /><br />
              - Provedores de serviços essenciais (com contratos de confidencialidade)
              <br />
              - Autoridades legais quando exigido por lei
              <br />
              - Sucessores em caso de fusão ou aquisição
            </p>

            <h2 className="text-2xl font-bold text-white mb-4">5. Seus Direitos</h2>
            <p className="text-zinc-300 mb-6">
              Você tem o direito de:
              <br /><br />
              • Acessar e solicitar cópia de seus dados
              <br />
              • Corrigir informações incorretas
              <br />
              • Solicitar a exclusão de dados pessoais
              <br />
              • Revogar consentimentos
              <br />
              • Opor-se a determinados processamentos
            </p>

            <h2 className="text-2xl font-bold text-white mb-4">6. Cookies e Tecnologias Similares</h2>
            <p className="text-zinc-300 mb-6">
              Utilizamos cookies para operar e melhorar nosso serviço. Você pode gerenciar suas preferências de cookies nas configurações do navegador.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4">7. Alterações nesta Política</h2>
            <p className="text-zinc-300 mb-6">
              Podemos atualizar esta política periodicamente. Notificaremos você sobre mudanças significativas por e-mail ou através de avisos em nosso serviço.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4">8. Contato</h2>
            <p className="text-zinc-300">
              Para exercer seus direitos ou esclarecer dúvidas sobre privacidade, entre em contato com nosso Encarregado de Dados:
              <br /><br />
              Email: <a href="mailto:privacidade@zeuslightning.com" className="text-blue-400 hover:underline">privacidade@zeuslightning.com</a>
            </p>
          </div>

          <div className="mt-10 pt-6 border-t border-zinc-800">
            <h3 className="text-lg font-medium text-white mb-4">Ainda com dúvidas?</h3>
            <p className="text-zinc-300 mb-4">
              Consulte nossos Termos de Serviço para mais informações ou entre em contato.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link 
                href="/Terms" 
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors"
              >
                Ver Termos de Serviço
              </Link>
              <Link 
                href="/Contact" 
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Fale conosco
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
      </div>
    </main>
  );
}