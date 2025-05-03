"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiCheckCircle, FiStar, FiArrowRight, FiHelpCircle } from "react-icons/fi";

export default function PricingPage() {
  const plans = [
    {
      name: "ALFA",
      subtitle: "Relatórios ESG Básicos",
      price: "R$XXXX",
      period: "/mês",
      description: "Geração de relatórios ESG em conformidade com IFRS S1 e S2",
      features: [
        "Processo automatizado de relatórios",
        "Dados auditáveis e transparentes",
        "Custo-benefício acessível",
        "Suporte por e-mail",
        "Atualização regulatória básica"
      ],
      popular: false,
      bgColor: "from-zinc-900/80 to-zinc-800/90",
      buttonVariant: "outline"
    },
    {
      name: "BETA",
      subtitle: "ESG Completo",
      price: "R$XXXX",
      period: "/mês",
      description: "Plataforma integrada com marketplace e repositório centralizado",
      features: [
        "Tudo do ALFA +",
        "Marketplace de soluções ESG",
        "Repositório centralizado de documentos",
        "Processo 10x mais rápido",
        "Suporte prioritário",
        "Integração com dados básicos"
      ],
      popular: true,
      bgColor: "from-green-900/70 to-green-800/80",
      buttonVariant: "primary"
    },
    {
      name: "GAMMA",
      subtitle: "Ecossistema ESG",
      price: "R$XXXX",
      period: "/mês",
      description: "Solução completa com IA especializada e curadoria",
      features: [
        "Tudo do BETA +",
        "Atena - IA especialista em ESG",
        "Curadoria ESG sob demanda",
        "Análises inteligentes de dados",
        "Recomendações personalizadas",
        "Mentoria para programas sustentáveis"
      ],
      popular: false,
      bgColor: "from-blue-900/70 to-blue-800/80",
      buttonVariant: "outline"
    },
    {
      name: "DELTA",
      subtitle: "Para ONGs e Provedores",
      price: "R$XXXX",
      period: "/mês",
      description: "Plataforma para divulgar projetos e conectar-se com investidores",
      features: [
        "Visibilidade estratégica",
        "Networking de impacto",
        "Conexão com investidores ESG",
        "Ferramentas de credibilidade",
        "Dashboard de oportunidades",
        "Relatórios de engajamento"
      ],
      popular: false,
      bgColor: "from-purple-900/70 to-purple-800/80",
      buttonVariant: "outline"
    },
    {
      name: "ÔMEGA",
      subtitle: "Para Investidores",
      price: "Sob consulta",
      description: "Dados financeiros e ESG das principais empresas",
      features: [
        "Portfólio completo de indicadores",
        "Dados financeiros precisos",
        "Transparência em métricas ESG",
        "Ferramentas de análise avançada",
        "Alertas de desempenho",
        "Relatórios comparativos",
        "Acesso premium a dados do mercado"
      ],
      popular: false,
      bgColor: "from-red-900/70 to-red-800/80",
      buttonVariant: "outline"
    }
  ];

  const faqs = [
    {
      question: "Posso testar antes de comprar?",
      answer: "Sim, oferecemos demonstração personalizada de qualquer plano."
    },
    {
      question: "Há descontos para ONGs?",
      answer: "Sim, oferecemos condições especiais para organizações sem fins lucrativos."
    },
    {
      question: "Como é feita a atualização regulatória?",
      answer: "Nossa equipe monitora constantemente as mudanças nas normas IFRS e atualiza automaticamente a plataforma."
    },
    {
      question: "Posso migrar de plano depois?",
      answer: "Sim, você pode alterar seu plano a qualquer momento sem custos adicionais."
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
            Planos ESG para{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent block sm:inline">
              todas as necessidades
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
            Escolha o plano ideal para sua jornada de sustentabilidade e conformidade com as normas internacionais.
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
                  ? "ring-1 lg:ring-2 ring-emerald-500 shadow-lg transform lg:scale-[1.03] xl:col-span-1" 
                  : "shadow-md"
              }`}
              whileHover={{ y: -5 }}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold px-3 py-1.5 rounded-bl-lg flex items-center">
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
                <Link href={'/Register'}>
                  <button
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center cursor-pointer ${
                    plan.popular
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg hover:shadow-emerald-500/20"
                    : "bg-zinc-800/50 hover:bg-zinc-800 text-white border border-zinc-700 hover:border-zinc-600"
                  }`}
                  >
                  {plan.price === "Sob consulta" ? "Fale Conosco" : "Começar Agora"}
                  <FiArrowRight className="ml-2" />
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <motion.div 
          className="mt-16 bg-zinc-900/50 border border-zinc-700/50 rounded-xl lg:rounded-2xl overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="p-6 sm:p-7 lg:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center">
              <FiHelpCircle className="text-teal-400 mr-2" /> Perguntas Frequentes
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