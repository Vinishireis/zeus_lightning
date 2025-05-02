"use client";

import { AuroraBackground } from "@/components/ui/aurora-background";
import { motion } from "framer-motion";
import { FiCheckCircle, FiZap, FiStar, FiArrowRight, FiHelpCircle } from "react-icons/fi";

export default function PricingPage() {
  const plans = [
    {
      name: "Alfa",
      subtitle: "Básico",
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
      name: "Beta",
      subtitle: "Iniciante",
      price: "R$29",
      period: "/mês",
      description: "Para usuários individuais e freelancers",
      features: [
        "20 relatórios/mês",
        "Suporte por e-mail",
        "Armazenamento por 90 dias",
        "Até 50MB por upload",
        "Visualização básica de dados",
        "Exportar em CSV"
      ],
      popular: false,
      bgColor: "from-green-900/70 to-green-800/80",
      buttonVariant: "outline"
    },
    {
      name: "Gama",
      subtitle: "Profissional",
      price: "R$99",
      period: "/mês",
      description: "Para equipes e uso profissional",
      features: [
        "100 relatórios/mês",
        "Suporte prioritário",
        "Armazenamento por 1 ano",
        "Até 200MB por upload",
        "Exportar em PDF/CSV",
        "Dashboards avançados",
        "3 usuários incluídos"
      ],
      popular: true,
      bgColor: "from-blue-900/70 to-blue-800/80",
      buttonVariant: "primary"
    },
    {
      name: "Delta",
      subtitle: "Avançado",
      price: "R$199",
      period: "/mês",
      description: "Para empresas em crescimento",
      features: [
        "500 relatórios/mês",
        "Suporte 24/5",
        "Armazenamento por 2 anos",
        "Até 500MB por upload",
        "Exportar em PDF/CSV/JSON",
        "Dashboards personalizados",
        "10 usuários incluídos",
        "Integração com API"
      ],
      popular: false,
      bgColor: "from-purple-900/70 to-purple-800/80",
      buttonVariant: "outline"
    },
    {
      name: "Ômega",
      subtitle: "Empresarial",
      price: "Sob consulta",
      description: "Solução personalizada para sua empresa",
      features: [
        "Relatórios ilimitados",
        "Suporte 24/7 dedicado",
        "Armazenamento permanente",
        "Uploads até 2GB",
        "API integrada completa",
        "SSO e On-premise",
        "Usuários ilimitados",
        "Treinamento personalizado"
      ],
      popular: false,
      bgColor: "from-red-900/70 to-red-800/80",
      buttonVariant: "outline"
    }
  ];

  const featuresComparison = [
    {
      name: "Relatórios mensais",
      alfa: "5",
      beta: "20",
      gama: "100",
      delta: "500",
      omega: "Ilimitado"
    },
    {
      name: "Armazenamento",
      alfa: "30 dias",
      beta: "90 dias",
      gama: "1 ano",
      delta: "2 anos",
      omega: "Permanente"
    },
    {
      name: "Tamanho do upload",
      alfa: "10MB",
      beta: "50MB",
      gama: "200MB",
      delta: "500MB",
      omega: "2GB"
    },
    {
      name: "Suporte",
      alfa: "E-mail",
      beta: "E-mail",
      gama: "Prioritário",
      delta: "24/5",
      omega: "24/7 dedicado"
    },
    {
      name: "Exportação de dados",
      alfa: "-",
      beta: "CSV",
      gama: "PDF/CSV",
      delta: "PDF/CSV/JSON",
      omega: "Todos + API"
    },
    {
      name: "Usuários incluídos",
      alfa: "1",
      beta: "1",
      gama: "3",
      delta: "10",
      omega: "Ilimitado"
    },
    {
      name: "Integração",
      alfa: "-",
      beta: "-",
      gama: "Básica",
      delta: "API",
      omega: "Completa"
    }
  ];

  const faqs = [
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
    },
    {
      question: "Existe um período de teste gratuito?",
      answer: "Sim, oferecemos 14 dias grátis para testar qualquer plano pago."
    }
  ];

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-black">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 sm:px-6 py-12 lg:py-16 max-w-7xl"
      >
        {/* Header Section */}
        <div className="text-center pt-10 pb-20">
          <motion.h1
            className="text-4xl sm:text-5xl font-bold text-white mb-3 sm:mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.1,
              duration: 0.6,
              ease: "easeOut",
            }}
          >
            Planos para{" "}
            <span className="bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent block sm:inline">
              todos os perfis
            </span>
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-zinc-200 max-w-2xl md:max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
            }}
          >
            Escolha o plano ideal para suas necessidades de análise e geração de
            relatórios de sistemas.
          </motion.p>
        </div>

        {/* Pricing Plans - Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 lg:gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className={`relative rounded-xl lg:rounded-2xl overflow-hidden border border-zinc-700/50 hover:border-zinc-600 transition-all duration-300 ${
                plan.popular 
                  ? "ring-1 lg:ring-2 ring-blue-500 shadow-lg transform lg:scale-[1.03] xl:col-span-1" 
                  : "shadow-md"
              }`}
              whileHover={{ y: -5 }}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold px-3 py-1.5 rounded-bl-lg flex items-center">
                  <FiStar className="mr-1.5" /> POPULAR
                </div>
              )}
              
              <div className={`bg-gradient-to-br ${plan.bgColor} h-full flex flex-col p-6 sm:p-7`}>
                <div className="mb-6 sm:mb-7">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">{plan.name}</h3>
                  <p className="text-sm text-zinc-300 mb-2">{plan.subtitle}</p>
                  <div className="flex items-end">
                    <span className="text-3xl sm:text-4xl font-bold text-white">{plan.price}</span>
                    {plan.period && (
                      <span className="text-zinc-300 text-sm sm:text-base ml-1.5 mb-1">{plan.period}</span>
                    )}
                  </div>
                  <p className="text-sm sm:text-base text-zinc-300 mt-2">{plan.description}</p>
                </div>

                <ul className="space-y-3 sm:space-y-3.5 mb-7 sm:mb-8 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <FiCheckCircle className="text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm sm:text-base text-zinc-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center ${
                    plan.popular
                      ? "bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-lg hover:shadow-blue-500/20"
                      : "bg-zinc-800/50 hover:bg-zinc-800 text-white border border-zinc-700 hover:border-zinc-600"
                  }`}
                >
                  {plan.subtitle === "Empresarial" ? "Fale Conosco" : "Começar Agora"}
                  <FiArrowRight className="ml-2" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Feature Comparison - Mobile Friendly */}
        <motion.div 
          className="mt-16 bg-zinc-900/50 border border-zinc-700/50 rounded-xl lg:rounded-2xl overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="p-6 sm:p-7 lg:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center">
              <FiZap className="text-yellow-400 mr-2" /> Comparação Detalhada
            </h2>
            
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-700">
                    <th className="text-left pb-4 sm:pb-5 text-sm sm:text-base font-medium text-zinc-300">Recursos</th>
                    <th className="text-center pb-4 sm:pb-5 text-sm sm:text-base font-medium text-zinc-300">Alfa</th>
                    <th className="text-center pb-4 sm:pb-5 text-sm sm:text-base font-medium text-zinc-300">Beta</th>
                    <th className="text-center pb-4 sm:pb-5 text-sm sm:text-base font-medium text-zinc-300 bg-blue-900/20">Gama</th>
                    <th className="text-center pb-4 sm:pb-5 text-sm sm:text-base font-medium text-zinc-300">Delta</th>
                    <th className="text-center pb-4 sm:pb-5 text-sm sm:text-base font-medium text-zinc-300">Ômega</th>
                  </tr>
                </thead>
                <tbody>
                  {featuresComparison.map((feature, index) => (
                    <tr key={index} className={`${index !== featuresComparison.length - 1 ? "border-b border-zinc-800/50" : ""}`}>
                      <td className="py-4 text-sm sm:text-base text-zinc-300 font-medium">{feature.name}</td>
                      <td className="text-center py-4">
                        <span className={`text-sm sm:text-base ${
                          feature.alfa === "-" ? "text-zinc-500" : "text-white"
                        }`}>
                          {feature.alfa}
                        </span>
                      </td>
                      <td className="text-center py-4">
                        <span className={`text-sm sm:text-base ${
                          feature.beta === "-" ? "text-zinc-500" : "text-white"
                        }`}>
                          {feature.beta}
                        </span>
                      </td>
                      <td className="text-center py-4 bg-blue-900/10">
                        <span className={`text-sm sm:text-base ${
                          feature.gama === "-" ? "text-zinc-500" : "text-white"
                        }`}>
                          {feature.gama}
                        </span>
                      </td>
                      <td className="text-center py-4">
                        <span className={`text-sm sm:text-base ${
                          feature.delta === "-" ? "text-zinc-500" : "text-white"
                        }`}>
                          {feature.delta}
                        </span>
                      </td>
                      <td className="text-center py-4">
                        <span className={`text-sm sm:text-base ${
                          feature.omega === "-" ? "text-zinc-500" : "text-white"
                        }`}>
                          {feature.omega}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {featuresComparison.map((feature, index) => (
                <div key={index} className="bg-zinc-800/30 rounded-lg p-4 border border-zinc-700/50">
                  <h3 className="font-medium text-white mb-3">{feature.name}</h3>
                  <div className="grid grid-cols-5 gap-2 text-center">
                    <div>
                      <p className="text-xs text-zinc-400 mb-1">Alfa</p>
                      <p className={`text-xs ${
                        feature.alfa === "-" ? "text-zinc-500" : "text-white"
                      }`}>
                        {feature.alfa}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-400 mb-1">Beta</p>
                      <p className={`text-xs ${
                        feature.beta === "-" ? "text-zinc-500" : "text-white"
                      }`}>
                        {feature.beta}
                      </p>
                    </div>
                    <div className="bg-blue-900/20 rounded py-1">
                      <p className="text-xs text-zinc-400 mb-1">Gama</p>
                      <p className={`text-xs ${
                        feature.gama === "-" ? "text-zinc-500" : "text-white"
                      }`}>
                        {feature.gama}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-400 mb-1">Delta</p>
                      <p className={`text-xs ${
                        feature.delta === "-" ? "text-zinc-500" : "text-white"
                      }`}>
                        {feature.delta}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-400 mb-1">Ômega</p>
                      <p className={`text-xs ${
                        feature.omega === "-" ? "text-zinc-500" : "text-white"
                      }`}>
                        {feature.omega}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div 
          className="mt-16 bg-zinc-900/50 border border-zinc-700/50 rounded-xl lg:rounded-2xl overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="p-6 sm:p-7 lg:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center">
              <FiHelpCircle className="text-indigo-400 mr-2" /> Perguntas Frequentes
            </h2>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-zinc-700/50 pb-4 last:border-0 last:pb-0">
                  <h3 className="text-lg font-medium text-white mb-2">{faq.question}</h3>
                  <p className="text-zinc-300 text-sm sm:text-base">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}