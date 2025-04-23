"use client";

import { AuroraBackground } from "@/components/aurora-background";
import { motion } from "framer-motion";
import { FiCheckCircle, FiZap, FiStar, FiArrowRight } from "react-icons/fi";

export default function PricingPage() {
  const plans = [
    {
      name: "Básico",
      price: "Grátis",
      description: "Ideal para testes e pequenos projetos",
      features: [
        "5 relatórios/mês",
        "Suporte por e-mail",
        "Armazenamento por 30 dias",
        "Até 10MB por upload",
        "Visualização básica de dados"
      ],
      popular: false,
      bgColor: "from-zinc-900/80 to-zinc-800/90",
      buttonVariant: "outline"
    },
    {
      name: "Profissional",
      price: "R$99",
      period: "/mês",
      description: "Para equipes e uso profissional",
      features: [
        "50 relatórios/mês",
        "Suporte prioritário",
        "Armazenamento por 1 ano",
        "Até 100MB por upload",
        "Exportar em PDF/CSV",
        "Dashboards avançados"
      ],
      popular: true,
      bgColor: "from-blue-900/70 to-blue-800/80",
      buttonVariant: "primary"
    },
    {
      name: "Empresarial",
      price: "Sob consulta",
      description: "Solução personalizada para sua empresa",
      features: [
        "Relatórios ilimitados",
        "Suporte 24/7 dedicado",
        "Armazenamento permanente",
        "Uploads até 1GB",
        "API integrada",
        "SSO e On-premise",
        "Treinamento personalizado"
      ],
      popular: false,
      bgColor: "from-purple-900/70 to-purple-800/80",
      buttonVariant: "outline"
    }
  ];

  const featuresComparison = [
    {
      name: "Relatórios mensais",
      basic: "5",
      pro: "50",
      enterprise: "Ilimitado"
    },
    {
      name: "Armazenamento",
      basic: "30 dias",
      pro: "1 ano",
      enterprise: "Permanente"
    },
    {
      name: "Tamanho do upload",
      basic: "10MB",
      pro: "100MB",
      enterprise: "1GB"
    },
    {
      name: "Suporte",
      basic: "Básico",
      pro: "Prioritário",
      enterprise: "24/7 dedicado"
    },
    {
      name: "Exportação de dados",
      basic: "-",
      pro: "PDF/CSV",
      enterprise: "PDF/CSV/API"
    },
    {
      name: "Usuários",
      basic: "1",
      pro: "3",
      enterprise: "Ilimitado"
    },
    {
      name: "Integração",
      basic: "-",
      pro: "Básica",
      enterprise: "Completa"
    }
  ];

  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 sm:px-6 py-12 lg:py-16 max-w-7xl"
      >
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16 px-4">
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Planos para <span className="bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">todos os perfis</span>
          </motion.h1>
          <motion.p 
            className="text-base sm:text-lg text-zinc-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Escolha o plano ideal para suas necessidades de análise e geração de relatórios de sistemas.
          </motion.p>
        </div>

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className={`relative rounded-xl lg:rounded-2xl overflow-hidden border border-zinc-700/50 hover:border-zinc-600 transition-all duration-300 ${
                plan.popular ? "ring-1 lg:ring-2 ring-blue-500 shadow-lg" : "shadow-md"
              }`}
              whileHover={{ y: -5 }}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold px-3 py-1.5 rounded-bl-lg flex items-center">
                  <FiStar className="mr-1.5" /> POPULAR
                </div>
              )}
              
              <div className={`bg-gradient-to-br ${plan.bgColor} h-full flex flex-col p-5 sm:p-6`}>
                <div className="mb-5 sm:mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="flex items-end">
                    <span className="text-3xl sm:text-4xl font-bold text-white">{plan.price}</span>
                    {plan.period && (
                      <span className="text-zinc-300 text-sm sm:text-base ml-1.5 mb-1">{plan.period}</span>
                    )}
                  </div>
                  <p className="text-sm sm:text-base text-zinc-300 mt-2">{plan.description}</p>
                </div>

                <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <FiCheckCircle className="text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm sm:text-base text-zinc-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-2.5 sm:py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center ${
                    plan.popular
                      ? "bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-lg hover:shadow-blue-500/20"
                      : "bg-zinc-800/50 hover:bg-zinc-800 text-white border border-zinc-700 hover:border-zinc-600"
                  }`}
                >
                  {plan.name === "Empresarial" ? "Fale Conosco" : "Começar Agora"}
                  <FiArrowRight className="ml-2" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Feature Comparison */}
        <motion.div 
          className="mt-16 bg-zinc-900/50 border border-zinc-700/50 rounded-xl lg:rounded-2xl overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="p-5 sm:p-6 lg:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-5 sm:mb-6 flex items-center">
              <FiZap className="text-yellow-400 mr-2" /> Comparação Detalhada
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-zinc-700">
                    <th className="text-left pb-3 sm:pb-4 text-sm sm:text-base font-medium text-zinc-300">Recursos</th>
                    <th className="text-center pb-3 sm:pb-4 text-sm sm:text-base font-medium text-zinc-300">Básico</th>
                    <th className="text-center pb-3 sm:pb-4 text-sm sm:text-base font-medium text-zinc-300">Profissional</th>
                    <th className="text-center pb-3 sm:pb-4 text-sm sm:text-base font-medium text-zinc-300">Empresarial</th>
                  </tr>
                </thead>
                <tbody>
                  {featuresComparison.map((feature, index) => (
                    <tr key={index} className={`${index !== featuresComparison.length - 1 ? "border-b border-zinc-800/50" : ""}`}>
                      <td className="py-3 sm:py-4 text-sm sm:text-base text-zinc-300 font-medium">{feature.name}</td>
                      <td className="text-center py-3 sm:py-4">
                        <span className={`text-sm sm:text-base ${
                          feature.basic === "-" ? "text-zinc-500" : "text-white"
                        }`}>
                          {feature.basic}
                        </span>
                      </td>
                      <td className="text-center py-3 sm:py-4 bg-zinc-800/20">
                        <span className={`text-sm sm:text-base ${
                          feature.pro === "-" ? "text-zinc-500" : "text-white"
                        }`}>
                          {feature.pro}
                        </span>
                      </td>
                      <td className="text-center py-3 sm:py-4">
                        <span className={`text-sm sm:text-base ${
                          feature.enterprise === "-" ? "text-zinc-500" : "text-white"
                        }`}>
                          {feature.enterprise}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div 
          className="mt-16 bg-zinc-900/50 border border-zinc-700/50 rounded-xl lg:rounded-2xl p-5 sm:p-6 lg:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-5">Perguntas Frequentes</h2>
          <div className="space-y-4">
            {[
              {
                question: "Posso mudar de plano depois?",
                answer: "Sim, você pode atualizar ou downgrade seu plano a qualquer momento."
              },
              {
                question: "Há cobrança por cancelamento?",
                answer: "Não, você pode cancelar quando quiser sem taxas adicionais."
              },
              {
                question: "Quais métodos de pagamento são aceitos?",
                answer: "Cartões de crédito, PIX e boleto bancário."
              }
            ].map((item, index) => (
              <div key={index} className="border-b border-zinc-800/50 pb-4">
                <h3 className="text-sm sm:text-base font-medium text-white mb-2">{item.question}</h3>
                <p className="text-sm text-zinc-400">{item.answer}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AuroraBackground>
  );
}