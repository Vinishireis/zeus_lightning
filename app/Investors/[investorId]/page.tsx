'use client';

import { motion } from "framer-motion";
import { FiArrowLeft, FiCheck, FiDollarSign, FiTrendingUp, FiGlobe, FiUsers, FiCalendar } from "react-icons/fi";
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
    logo: '/capital-verde.png',
    title: "Fundo de Investimento em Sustentabilidade",
    description: "Foco em startups de tecnologia verde e soluções ambientais inovadoras.",
    founded: 2017,
    sectors: ["Energia", "Agro", "Tecnologia"],
    fullDescription: "O Capital Verde é um fundo de venture capital especializado em negócios sustentáveis. Buscamos startups em estágio inicial a growth que estejam desenvolvendo soluções inovadoras para os desafios ambientais mais urgentes. Nossa abordagem combina capital paciente com suporte estratégico para escalar impactos positivos.",
    investmentCriteria: [
      "Modelo de negócio com impacto ambiental mensurável",
      "Equipe comprometida e complementar",
      "Tecnologia ou inovação comprovada",
      "Potencial de escala regional ou global",
      "Alinhamento com pelo menos 2 ODS da ONU"
    ],
    portfolio: [
      { company: "SolarFlex", sector: "Energia", amount: "R$ 2.5M", stage: "Série A" },
      { company: "AgroEco", sector: "Agro", amount: "R$ 1.8M", stage: "Seed" },
      { company: "CleanTech Labs", sector: "Tecnologia", amount: "R$ 3.2M", stage: "Série A" }
    ],
    ticket: "R$ 500K - R$ 5M",
    geography: "América Latina",
    contact: "contato@capitalverde.com"
  },
  "eco-fund": {
    name: "Eco Fund",
    logo: '/eco-fund.png',
    title: "Fundo de Impacto Ambiental",
    description: "Investimos em projetos com comprovado impacto positivo no meio ambiente.",
    founded: 2015,
    sectors: ["Reciclagem", "Água", "Florestas"],
    fullDescription: "O Eco Fund é um dos principais fundos de impacto ambiental da região, com mais de R$ 200M em ativos sob gestão. Nosso foco está em soluções para economia circular, gestão de recursos hídricos e conservação de biomas. Trabalhamos com investimentos de dívida e equity, adaptados às necessidades de cada negócio.",
    investmentCriteria: [
      "Impacto ambiental quantificável",
      "Modelo financeiro sustentável",
      "Governança transparente",
      "Potencial de replicação",
      "Engajamento com comunidades locais"
    ],
    portfolio: [
      { company: "RecycleNow", sector: "Reciclagem", amount: "R$ 4.5M", stage: "Série B" },
      { company: "AquaSave", sector: "Água", amount: "R$ 3.8M", stage: "Série A" },
      { company: "ForestGuard", sector: "Florestas", amount: "R$ 6.2M", stage: "Growth" }
    ],
    ticket: "R$ 1M - R$ 10M",
    geography: "Global",
    contact: "invest@ecofund.org"
  },
  "sustain-ventures": {
    name: "Sustain Ventures",
    logo: '/sustain-ventures.png',
    title: "Capital de Risco Sustentável",
    description: "Aceleramos negócios que estão reinventando indústrias tradicionais com sustentabilidade.",
    founded: 2019,
    sectors: ["Moda", "Construção", "Energia"],
    fullDescription: "A Sustain Ventures é uma venture builder focada em transformar indústrias tradicionais através da sustentabilidade. Além de capital, oferecemos suporte operacional, acesso a nossa rede de especialistas e programas de aceleração customizados. Investimos em estágio pré-seed e seed, com follow-on para os melhores performers.",
    investmentCriteria: [
      "Inovação em indústrias tradicionais",
      "Redução de pegada de carbono",
      "Equipe diversificada",
      "MVP validado",
      "Proposta de valor clara"
    ],
    portfolio: [
      { company: "EcoWear", sector: "Moda", amount: "R$ 1.2M", stage: "Seed" },
      { company: "GreenBuild", sector: "Construção", amount: "R$ 2.0M", stage: "Pré-seed" },
      { company: "PowerEco", sector: "Energia", amount: "R$ 1.5M", stage: "Seed" }
    ],
    ticket: "R$ 250K - R$ 2M",
    geography: "Brasil",
    contact: "hello@sustainventures.vc"
  }
};

export default function InvestorDetails({ params }: { params: Promise<{ investorId: string }> }) {
    const router = useRouter();
    const resolvedParams = React.use(params);
    const investor = investorData[resolvedParams.investorId as keyof typeof investorData];

    if (!investor) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Investidor não encontrado</h1>
                    <button
                        onClick={() => router.push('/investors')}
                        className="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                    >
                        Voltar para investidores
                    </button>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen w-full bg-black text-white z-1">
            <div className="container mx-auto px-4 py-12 max-w-6xl">
                {/* Botão Voltar */}
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 mb-8 transition-colors"
                >
                    <FiArrowLeft /> Voltar para investidores
                </motion.button>

                {/* Cabeçalho */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col md:flex-row gap-8 mb-12"
                >
                    {/* Logo e Info Básica */}
                    <div className="md:w-1/3">
                        <div className="relative h-64 w-full rounded-2xl overflow-hidden mb-6">
                            <Image
                                src={investor.logo}
                                alt={investor.name}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>

                        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                            <h1 className="text-2xl font-bold mb-2">{investor.name}</h1>
                            <div className="space-y-3">
                                <div className="flex items-center text-zinc-400">
                                    <FiCalendar className="mr-2" />
                                    <span>Fundado em {investor.founded}</span>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {investor.sectors.map(sector => (
                                        <span
                                            key={sector}
                                            className="px-3 py-1 bg-emerald-900/20 text-xs rounded-full text-emerald-300 border border-emerald-800/50"
                                        >
                                            {sector}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center text-emerald-400">
                                    <FiDollarSign className="mr-2" />
                                    <span>Ticket: {investor.ticket}</span>
                                </div>

                                <div className="flex items-center text-blue-400">
                                    <FiGlobe className="mr-2" />
                                    <span>Atuação: {investor.geography}</span>
                                </div>
                            </div>
                        </div>

                        {/* Contato */}
                        <div className="mt-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="bg-gradient-to-r from-emerald-900/50 to-cyan-900/50 border border-emerald-800/30 rounded-2xl p-4 text-center"
                            >
                                <h3 className="text-2xl font-bold mb-6">Entrar em Contato</h3>
                                <Link
                                    href={`mailto:${investor.contact}`}
                                    className="inline-block px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition-colors cursor-pointer"
                                >
                                    Enviar Proposta
                                </Link>
                            </motion.div>
                        </div>
                    </div>

                    {/* Detalhes do Investidor */}
                    <div className="md:w-2/3">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <h2 className="text-3xl font-bold mb-4">{investor.title}</h2>
                            <p className="text-zinc-300 mb-6">{investor.fullDescription}</p>

                            {/* Critérios de Investimento */}
                            <div className="mb-8">
                                <h3 className="text-xl font-bold mb-4 flex items-center">
                                    <FiCheck className="text-emerald-400 mr-2" /> Critérios de Investimento
                                </h3>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {investor.investmentCriteria.map((criterion, index) => (
                                        <li key={index} className="flex items-start gap-2 text-zinc-300">
                                            <FiCheck className="text-emerald-400 mt-1 flex-shrink-0" /> {criterion}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Portfólio */}
                            <div className="mb-8">
                                <h3 className="text-xl font-bold mb-4 flex items-center">
                                    <FiTrendingUp className="text-blue-400 mr-2" /> Portfólio de Investimentos
                                </h3>
                                <div className="space-y-4">
                                    {investor.portfolio.map((investment, index) => (
                                        <div key={index} className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
                                            <div className="flex justify-between items-center">
                                                <h4 className="font-bold">{investment.company}</h4>
                                                <span className="text-emerald-400 text-sm font-medium">{investment.amount}</span>
                                            </div>
                                            <div className="flex justify-between text-sm text-zinc-400 mt-2">
                                                <span>Setor: {investment.sector}</span>
                                                <span>Estágio: {investment.stage}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}