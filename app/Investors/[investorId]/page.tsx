"use client";

import { motion } from "framer-motion";
import {
  FiArrowLeft,
  FiCheck,
  FiMail,
  FiTrendingUp,
  FiCalendar,
  FiBriefcase,
  FiBarChart2

} from "react-icons/fi";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Investment = {
  company: string;
  sector: string;
  amount: string;
  stage: string;
};

type Investor = {
  name: string;
  logo: string;
  title: string;
  description: string;
  founded: number;
  sectors: string[];
  fullDescription: string;
  investmentCriteria: string[];
  portfolio: Investment[];
  ticket: string;
  geography: string;
  contact: string;
};

const investorData: Record<string, Investor> = {
  "capital-verde": {
    name: "Capital Verde",
    logo: "/capital-verde.png",
    title: "Fundo de Investimento em Sustentabilidade",
    description:
      "Foco em startups de tecnologia verde e soluções ambientais inovadoras.",
    founded: 2017,
    sectors: ["Energia", "Agro", "Tecnologia"],
    fullDescription:
      "O Capital Verde é um fundo de venture capital especializado em negócios sustentáveis. Buscamos startups em estágio inicial a growth que estejam desenvolvendo soluções inovadoras para os desafios ambientais mais urgentes. Nossa abordagem combina capital paciente com suporte estratégico para escalar impactos positivos.",
    investmentCriteria: [
      "Modelo de negócio com impacto ambiental mensurável",
      "Equipe comprometida e complementar",
      "Tecnologia ou inovação comprovada",
      "Potencial de escala regional ou global",
      "Alinhamento com pelo menos 2 ODS da ONU",
    ],
    portfolio: [
      {
        company: "SolarFlex",
        sector: "Energia",
        amount: "R$ 2.5M",
        stage: "Série A",
      },
      { company: "AgroEco", sector: "Agro", amount: "R$ 1.8M", stage: "Seed" },
      {
        company: "CleanTech Labs",
        sector: "Tecnologia",
        amount: "R$ 3.2M",
        stage: "Série A",
      },
    ],
    ticket: "R$ 500K - R$ 5M",
    geography: "América Latina",
    contact: "contato@capitalverde.com",
  },
  "eco-fund": {
    name: "Eco Fund",
    logo: "/eco-fund.png",
    title: "Fundo de Impacto Ambiental",
    description:
      "Investimos em projetos com comprovado impacto positivo no meio ambiente.",
    founded: 2015,
    sectors: ["Reciclagem", "Água", "Florestas"],
    fullDescription:
      "O Eco Fund é um dos principais fundos de impacto ambiental da região, com mais de R$ 200M em ativos sob gestão. Nosso foco está em soluções para economia circular, gestão de recursos hídricos e conservação de biomas. Trabalhamos com investimentos de dívida e equity, adaptados às necessidades de cada negócio.",
    investmentCriteria: [
      "Impacto ambiental quantificável",
      "Modelo financeiro sustentável",
      "Governança transparente",
      "Potencial de replicação",
      "Engajamento com comunidades locais",
    ],
    portfolio: [
      {
        company: "RecycleNow",
        sector: "Reciclagem",
        amount: "R$ 4.5M",
        stage: "Série B",
      },
      {
        company: "AquaSave",
        sector: "Água",
        amount: "R$ 3.8M",
        stage: "Série A",
      },
      {
        company: "ForestGuard",
        sector: "Florestas",
        amount: "R$ 6.2M",
        stage: "Growth",
      },
    ],
    ticket: "R$ 1M - R$ 10M",
    geography: "Global",
    contact: "invest@ecofund.org",
  },
  "sustain-ventures": {
    name: "Sustain Ventures",
    logo: "/sustain-ventures.png",
    title: "Capital de Risco Sustentável",
    description:
      "Aceleramos negócios que estão reinventando indústrias tradicionais com sustentabilidade.",
    founded: 2019,
    sectors: ["Moda", "Construção", "Energia"],
    fullDescription:
      "A Sustain Ventures é uma venture builder focada em transformar indústrias tradicionais através da sustentabilidade. Além de capital, oferecemos suporte operacional, acesso a nossa rede de especialistas e programas de aceleração customizados. Investimos em estágio pré-seed e seed, com follow-on para os melhores performers.",
    investmentCriteria: [
      "Inovação em indústrias tradicionais",
      "Redução de pegada de carbono",
      "Equipe diversificada",
      "MVP validado",
      "Proposta de valor clara",
    ],
    portfolio: [
      { company: "EcoWear", sector: "Moda", amount: "R$ 1.2M", stage: "Seed" },
      {
        company: "GreenBuild",
        sector: "Construção",
        amount: "R$ 2.0M",
        stage: "Pré-seed",
      },
      {
        company: "PowerEco",
        sector: "Energia",
        amount: "R$ 1.5M",
        stage: "Seed",
      },
    ],
    ticket: "R$ 250K - R$ 2M",
    geography: "Brasil",
    contact: "hello@sustainventures.vc",
  },
};

export default function InvestorDetails({
  params,
}: {
  params: Promise<{ investorId: string }>;
}) {
  const router = useRouter();
  const resolvedParams = React.use(params);
  const investor =
    investorData[resolvedParams.investorId as keyof typeof investorData];

  if (!investor) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Investidor não encontrado</h1>
          <button
            onClick={() => router.push("/Investors")}
            className="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
          >
            Voltar para investidores
          </button>
        </div>
      </div>
    );
  }

return (
  <main className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-gray-900 to-black px-4 sm:px-6 lg:px-8 min-w-[320px]">
    {/* Efeito de background sutil */}
    <div className="absolute inset-0 opacity-5 pointer-events-none">
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-emerald-500 blur-[100px]"></div>
      <div className="absolute bottom-1/3 right-1/3 w-64 h-64 rounded-full bg-blue-500 blur-[100px]"></div>
    </div>

    <div className="container relative pt-25 mx-auto px-4 py-8 max-w-6xl z-10">
      {/* Botão Voltar - Com animação mais suave */}
      <Link href="/Investors" className="block mb-8">
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          whileHover={{ x: -3 }}
          className="flex items-center gap-3 px-5 py-3 rounded-xl border-2 border-emerald-500/40 hover:bg-emerald-500/10 text-emerald-400 hover:text-emerald-300 transition-all group active:scale-95 w-full max-w-md"
        >
          <FiArrowLeft className="text-xl group-hover:-translate-x-1 transition-transform flex-shrink-0" />
          <span className="font-semibold text-lg">
            Voltar para lista de investidores
          </span>
        </motion.button>
      </Link>

      {/* Container principal com animação refinada */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col lg:flex-row gap-8"
      >
        {/* Coluna esquerda - informações básicas */}
        <div className="lg:w-1/3 space-y-6">
          {/* Card de perfil com efeito de hover */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-zinc-900 border-2 border-zinc-800 rounded-3xl overflow-hidden shadow-lg shadow-emerald-500/10 transition-all duration-300"
          >
            {/* Imagem com overlay e efeito de zoom sutil */}
            <div className="relative h-64 w-full overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                className="h-full w-full"
              >
                <Image
                  src={investor.logo}
                  alt={investor.name}
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
              <h1 className="absolute bottom-4 left-4 z-20 text-3xl font-bold drop-shadow-lg">
                {investor.name}
              </h1>
            </div>

            {/* Informações com animação escalonada */}
            <div className="p-6 space-y-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-3 text-zinc-300"
              >
                <FiCalendar className="flex-shrink-0 text-emerald-400" />
                <span>Fundado em {investor.founded}</span>
              </motion.div>

              {/* Setores com animação em cascata */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-sm font-medium text-zinc-400 mb-2">
                  SETORES
                </h3>
                <div className="flex flex-wrap gap-2">
                  {investor.sectors.map((sector, i) => (
                    <motion.span
                      key={sector}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.05 }}
                      className="px-3 py-1 bg-emerald-900/30 text-emerald-300 text-xs rounded-full border border-emerald-800/50 font-medium hover:bg-emerald-900/50 transition-colors"
                    >
                      {sector}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Grid de informações com animação */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-2 gap-4 pt-2"
              >
                <div className="bg-zinc-800/20 p-3 rounded-lg">
                  <p className="text-sm text-zinc-400">TICKET</p>
                  <p className="text-lg font-semibold text-emerald-400">
                    {investor.ticket}
                  </p>
                </div>
                <div className="bg-zinc-800/20 p-3 rounded-lg">
                  <p className="text-sm text-zinc-400">ATUAÇÃO</p>
                  <p className="text-lg font-semibold text-blue-400">
                    {investor.geography}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Card de contato com efeito pulsante sutil */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            transition={{ 
              delay: 0.4,
              whileHover: { 
                type: "spring",
                stiffness: 400,
                damping: 10
              }
            }}
            className="bg-gradient-to-br from-emerald-900/60 to-cyan-900/40 border-2 border-emerald-800/40 rounded-3xl p-6 text-center shadow-lg shadow-emerald-500/10 relative overflow-hidden"
          >
            {/* Efeito de brilho sutil */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent opacity-0 hover:opacity-100 hover:animate-[spin_6s_linear_infinite] transition-opacity duration-300"></div>
            </div>
            
            <h3 className="text-2xl font-bold mb-4 relative z-10">Entrar em Contato</h3>
            <Link
              href={`mailto:${investor.contact}`}
              className="relative inline-flex items-center justify-center gap-2 w-full px-6 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold transition-all hover:shadow-lg hover:shadow-emerald-500/20 overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-emerald-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <FiMail className="text-xl relative z-10" />
              <span className="relative z-10">Enviar Proposta</span>
            </Link>
          </motion.div>
        </div>

        {/* Coluna direita - detalhes */}
        <div className="lg:w-2/3 space-y-8">
          {/* Seção de descrição com efeito de entrada */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-zinc-900/80 border-2 border-zinc-800 rounded-3xl p-8 backdrop-blur-sm"
          >
            <h2 className="text-3xl font-bold mb-6 relative">
              <span className="relative inline-block">
                {investor.title}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-500/50"></span>
              </span>
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-zinc-300 text-lg leading-relaxed">
                {investor.fullDescription}
              </p>
            </div>
          </motion.div>

          {/* Critérios de investimento com animação em cascata */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-zinc-900/80 border-2 border-zinc-800 rounded-3xl p-8 backdrop-blur-sm"
          >
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <FiCheck className="text-emerald-400" />
              <span>Critérios de Investimento</span>
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {investor.investmentCriteria.map((criterion, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  className="flex items-start gap-3 p-4 bg-zinc-800/30 rounded-xl border-l-4 border-emerald-500 hover:bg-zinc-800/50 transition-colors"
                >
                  <FiCheck className="text-emerald-400 mt-1 flex-shrink-0" />
                  <span className="text-zinc-300">{criterion}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Portfólio com animação de itens */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-zinc-900/80 border-2 border-zinc-800 rounded-3xl p-8 backdrop-blur-sm"
          >
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <FiTrendingUp className="text-blue-400" />
              <span>Portfólio de Investimentos</span>
            </h3>
            <div className="space-y-4">
              {investor.portfolio.map((investment, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ y: -3 }}
                  className="p-5 bg-zinc-800/20 hover:bg-zinc-800/40 rounded-xl border border-zinc-700 transition-all group"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-bold text-lg group-hover:text-emerald-300 transition-colors">
                      {investment.company}
                    </h4>
                    <span className="text-emerald-400 font-semibold bg-emerald-900/30 px-3 py-1 rounded-full text-sm">
                      {investment.amount}
                    </span>
                  </div>
                  <div className="flex flex-wrap justify-between gap-2 text-sm text-zinc-400">
                    <span className="flex items-center gap-1">
                      <FiBriefcase className="text-xs opacity-60" />
                      Setor: {investment.sector}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiBarChart2 className="text-xs opacity-60" />
                      Estágio: {investment.stage}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  </main>
);
}
