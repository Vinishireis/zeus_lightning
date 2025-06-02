"use client";

import { motion } from "framer-motion";
import { FiCheckCircle, FiStar, FiArrowRight, FiHelpCircle } from "react-icons/fi";
import Link from "next/link";

export default function PricingPage() {
  const plans = [
    {
      name: "ALFA",
      subtitle: "Relatórios ESG Básicos",
      price: "R$1,500",
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
      bgColor: "from-zinc-900/80 to-zinc-800/90"
    },
    {
      name: "BETA",
      subtitle: "ESG Completo",
      price: "R$3,500",
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
      bgColor: "from-green-900/70 to-green-800/80"
    },
    {
      name: "GAMA",
      subtitle: "Ecossistema ESG",
      price: "R$9,000",
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
      bgColor: "from-blue-900/70 to-blue-800/80"
    },
    {
      name: "DELTA",
      subtitle: "Para ONGs e Provedores",
      price: "R$200,00",
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
      bgColor: "from-purple-900/70 to-purple-800/80"
    },
    {
      name: "ÔMEGA",
      subtitle: "Para Investidores",
      price: "R$90,00",
      period: "/mês",
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
      bgColor: "from-red-900/70 to-red-800/80"
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
    <main className="min-h-screen w-full bg-black">
      <div className="container mx-auto px-4 sm:px-6 py-8 md:py-12 lg:py-16 max-w-7xl">
        {/* Header Section */}
        <motion.div 
          className="text-center pt-6 md:pt-12 pb-12 md:pb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 lg:mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="block">Planos ESG para</span>
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              todas as necessidades
            </span>
          </motion.h1>

          <motion.p
            className="text-sm md:text-base lg:text-lg text-zinc-300 max-w-md md:max-w-xl mx-auto mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Soluções completas para sua jornada de sustentabilidade e conformidade regulatória.
          </motion.p>
        </motion.div>

        {/* Pricing Plans - Layout Especial com Títulos */}
        <motion.div 
          className="relative space-y-8 md:space-y-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {/* Linha 1: Planos Essenciais (ALFA, BETA, GAMA) */}
          <div className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-white text-center md:text-left">
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Planos Essenciais
              </span>
              <span className="block text-sm text-zinc-400 mt-1">Soluções básicas para iniciar sua jornada ESG</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
              {plans.filter(plan => ['ALFA', 'BETA', 'GAMA'].includes(plan.name)).map((plan, index) => (
                <PlanCard 
                  plan={plan} 
                  index={index} 
                  key={plan.name}
                />
              ))}
            </div>
          </div>

          {/* Linha 2: Prestadores ESG (DELTA) */}
          <div className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-white text-center md:text-left">
              <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Prestadores ESG 
              </span>
              <span className="block text-sm text-zinc-400 mt-1">Soluções especializadas para organizações</span>
            </h2>
            
            <div className="flex justify-center">
              <div className="w-full md:w-2/3 lg:w-1/2">
                {plans.filter(plan => plan.name === 'DELTA').map((plan, index) => (
                  <PlanCard 
                    plan={plan} 
                    index={index} 
                    key={plan.name}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Linha 3: Solução Premium (ÔMEGA) */}
          <div className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-white text-center md:text-left">
              <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                Investidores
              </span>
              <span className="block text-sm text-zinc-400 mt-1">Para investidores e necessidades avançadas</span>
            </h2>
            
            <div className="flex justify-center">
              <div className="w-full md:w-2/3 lg:w-1/2">
                {plans.filter(plan => plan.name === 'ÔMEGA').map((plan, index) => (
                  <PlanCard 
                    plan={plan} 
                    index={index} 
                    key={plan.name}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

// Componente de Card
const PlanCard = ({ plan, index, className = "" }: { plan: any; index: number; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 + index * 0.1 }}
    className={`relative h-full flex flex-col ${className} ${
      plan.popular 
        ? "ring-2 ring-emerald-500 shadow-lg shadow-emerald-500/10"
        : "border border-zinc-700/50"
    } rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl`}
    whileHover={{ y: -5 }}
  >
    {plan.popular && (
      <div className="absolute top-0 right-0 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg flex items-center z-10">
        <FiStar className="mr-1.5" /> POPULAR
      </div>
    )}
    
    <div className={`bg-gradient-to-br ${plan.bgColor} h-full flex flex-col p-5 md:p-6`}>
      <div className="mb-5 md:mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg md:text-xl font-bold text-white">{plan.name}</h3>
            <p className="text-xs md:text-sm text-zinc-300 mt-1">{plan.subtitle}</p>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex items-end">
            <span className="text-2xl md:text-3xl font-bold text-white">{plan.price}</span>
            {plan.period && (
              <span className="text-zinc-300 text-sm ml-1.5 mb-1">{plan.period}</span>
            )}
          </div>
          <p className="text-xs md:text-sm text-zinc-300 mt-2">{plan.description}</p>
        </div>
      </div>

      <ul className="space-y-2.5 mb-6 flex-1">
        {plan.features.map((feature: string, i: number) => (
          <li key={i} className="flex items-start">
            <FiCheckCircle className="text-emerald-400 mr-2 mt-0.5 flex-shrink-0 text-sm" />
            <span className="text-xs md:text-sm text-zinc-300">{feature}</span>
          </li>
        ))}
      </ul>

      <Link href="/Register" className="mt-auto">
        <button
          className={`w-full py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center cursor-pointer ${
            plan.popular
              ? "bg-emerald-600 hover:bg-emerald-700 text-white"
              : "bg-zinc-800/70 hover:bg-zinc-800 text-white border border-zinc-700 hover:border-zinc-600"
          }`}
        >
          {plan.price === "Sob consulta" ? "Fale Conosco" : "Começar Agora"}
          <FiArrowRight className="ml-2" />
        </button>
      </Link>
    </div>
  </motion.div>
);