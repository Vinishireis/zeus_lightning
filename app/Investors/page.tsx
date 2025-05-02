"use client";

import { motion } from "framer-motion";
import { FiFilter, FiArrowRight, FiDollarSign, FiTrendingUp, FiGlobe } from "react-icons/fi";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Imagens fictícias para os investidores
import CapitalVerdeImg from '@/public/capital-verde.png';
import EcoFundImg from '@/public/eco-fund.png';
import SustainVenturesImg from '@/public/sustain-ventures.png';
import GreenGrowthImg from '@/public/green-growth.png';
import EarthCapitalImg from '@/public/earth-capital.png';

export default function InvestorsPage() {
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const router = useRouter();

  const investors = [
    {
      id: "capital-verde",
      name: "Capital Verde",
      logo: CapitalVerdeImg,
      title: "Fundo de Investimento em Sustentabilidade",
      description: "Foco em startups de tecnologia verde e soluções ambientais inovadoras.",
      sectors: ["Energia", "Agro", "Tecnologia"],
      ticket: "R$ 500K - R$ 5M",
      geography: "América Latina"
    },
    {
      id: "eco-fund",
      name: "Eco Fund",
      logo: EcoFundImg,
      title: "Fundo de Impacto Ambiental",
      description: "Investimos em projetos com comprovado impacto positivo no meio ambiente.",
      sectors: ["Reciclagem", "Água", "Florestas"],
      ticket: "R$ 1M - R$ 10M",
      geography: "Global"
    },
    {
      id: "sustain-ventures",
      name: "Sustain Ventures",
      logo: SustainVenturesImg,
      title: "Capital de Risco Sustentável",
      description: "Aceleramos negócios que estão reinventando indústrias tradicionais com sustentabilidade.",
      sectors: ["Moda", "Construção", "Energia"],
      ticket: "R$ 250K - R$ 2M",
      geography: "Brasil"
    },
    {
      id: "green-growth",
      name: "Green Growth Partners",
      logo: GreenGrowthImg,
      title: "Private Equity Verde",
      description: "Parceiros de crescimento para empresas maduras com modelos sustentáveis.",
      sectors: ["Alimentos", "Turismo", "Logística"],
      ticket: "R$ 5M+",
      geography: "América do Sul"
    },
    {
      id: "earth-capital",
      name: "Earth Capital",
      logo: EarthCapitalImg,
      title: "Investimento em Economia Circular",
      description: "Focamos exclusivamente em negócios que fecham o ciclo de materiais e recursos.",
      sectors: ["Plásticos", "Têxtil", "Eletrônicos"],
      ticket: "R$ 500K - R$ 3M",
      geography: "Global"
    }
  ];

  const sectorsList = ["Energia", "Agro", "Tecnologia", "Reciclagem", "Água", "Florestas", "Moda", "Construção", "Alimentos", "Turismo", "Logística", "Plásticos", "Têxtil", "Eletrônicos"];

  const filteredInvestors = selectedSector
  ? investors.filter(investor => investor.sectors.includes(selectedSector))
  : investors;

const navigateToInvestor = (investorId: string) => {
  router.push(`/Investors/${investorId}`);
};

return (
  <main className="min-h-screen w-full bg-black">
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      {/* Cabeçalho */}
      <div className="text-center pt-10 pb-12">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-white mb-6"
        >
          Conecte-se com <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Investidores</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-lg text-zinc-400 max-w-3xl mx-auto"
        >
          Encontre investidores alinhados com seus valores e prontos para impulsionar seu negócio sustentável.
        </motion.p>
      </div>

      {/* Filtro */}
      <motion.div 
        className="mb-12 sticky top-4 z-10 backdrop-blur-sm py-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <FiFilter className="text-emerald-400" /> Filtrar por Setor:
          </h3>
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setSelectedSector(null)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                !selectedSector 
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
              }`}
            >
              Todos
            </button>
            {sectorsList.map(sector => (
              <button
                key={sector}
                onClick={() => setSelectedSector(sector)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedSector === sector 
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                    : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                }`}
              >
                {sector}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Lista de Investidores */}
      <div className="space-y-6">
        {filteredInvestors.map((investor, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-700 transition-all duration-300 cursor-pointer"
            onClick={() => navigateToInvestor(investor.id)}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex flex-col md:flex-row">
              {/* Imagem do Investidor */}
              <div className="md:w-1/4 h-48 md:h-auto relative">
                <Image
                  src={investor.logo}
                  alt={investor.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent md:bg-gradient-to-r md:from-black/70 md:to-transparent flex items-end p-4">
                  <span className="text-white font-bold text-lg">{investor.name}</span>
                </div>
              </div>

              {/* Detalhes do Investidor */}
              <div className="md:w-3/4 p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{investor.title}</h3>
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
                </div>
                
                <p className="text-zinc-400 mb-4">{investor.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <FiDollarSign />
                    <span className="text-sm">Ticket: {investor.ticket}</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-400">
                    <FiGlobe />
                    <span className="text-sm">Atuação: {investor.geography}</span>
                  </div>
                </div>
                
                <div className="flex items-center text-emerald-400 group mt-4">
                  <span className="text-sm font-medium group-hover:underline">Ver detalhes do investidor</span>
                  <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mensagem quando não há resultados */}
      {filteredInvestors.length === 0 && (
        <div className="text-center py-20">
          <p className="text-zinc-400 text-lg">Nenhum investidor encontrado com o filtro selecionado.</p>
          <button
            onClick={() => setSelectedSector(null)}
            className="mt-4 px-6 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors"
          >
            Limpar filtros
          </button>
        </div>
      )}
    </div>
  </main>
);
}