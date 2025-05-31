"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiFilter, FiDollarSign, FiGlobe } from "react-icons/fi";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function InvestorsPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [showSectorsDropdown, setShowSectorsDropdown] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const investors = [
    {
      id: "capital-verde",
      name: "Capital Verde",
      logo: '/capital-verde.png',
      title: "Fundo de Investimento em Sustentabilidade",
      description: "Foco em startups de tecnologia verde e soluções ambientais inovadoras.",
      sectors: ["Energia", "Agro", "Tecnologia"],
      ticket: "R$ 500K - R$ 5M",
      geography: "América Latina",
      contact: "contato@capitalverde.com"
    },
    {
      id: "eco-fund",
      name: "Eco Fund",
      logo: '/eco-fund.png',
      title: "Fundo de Impacto Ambiental",
      description: "Investimos em projetos com comprovado impacto positivo no meio ambiente.",
      sectors: ["Reciclagem", "Água", "Florestas"],
      ticket: "R$ 1M - R$ 10M",
      geography: "Global",
      contact: "invest@ecofund.org"
    },
    {
      id: "sustain-ventures",
      name: "Sustain Ventures",
      logo: '/sustain-ventures.png',
      title: "Capital de Risco Sustentável",
      description: "Aceleramos negócios que estão reinventando indústrias tradicionais com sustentabilidade.",
      sectors: ["Moda", "Construção", "Energia"],
      ticket: "R$ 250K - R$ 2M",
      geography: "Brasil",
      contact: "hello@sustainventures.vc"
    }
  ];

  const sectorsList = [
    "Energia", "Agro", "Tecnologia", "Reciclagem", "Água", "Florestas", 
    "Moda", "Construção", "Atacado", "Distribuição", "Alimentício", 
    "Bebidas", "Agroindústria", "Logística", "Manufatura"
  ];

  const filteredInvestors = selectedSector
    ? investors.filter(investor => investor.sectors.includes(selectedSector))
    : investors;

  const toggleSector = (sector: string) => {
    setSelectedSector(selectedSector === sector ? null : sector);
    setShowSectorsDropdown(false);
  };

  const navigateToInvestor = (id: string) => {
    router.push(`/Investors/${id}`);
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
            Painel para <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Investidores</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-lg text-zinc-400 max-w-3xl mx-auto"
          >
            Encontre uma empresa com matching perfeito entre indicadores ESG e indicadores Financeiros.
          </motion.p>
        </div>

        {/* Filtro com responsividade e scroll horizontal */}
        <motion.div 
          className={`mb-12 sticky top-0 z-30 backdrop-blur-sm border-b border-zinc-800 transition-all duration-300 ${
            isScrolled ? 'py-2' : 'py-4'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="container mx-auto px-4 max-w-6xl transition-all duration-300">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6">
              <h3 className={`${
                isScrolled ? 'text-base' : 'text-lg'
              } font-bold text-white flex items-center gap-2`}>
                <FiFilter className="text-emerald-400" />
                {isScrolled ? 'Filtros:' : 'Filtrar por Setor:'}
              </h3>
              
              <div className="w-full overflow-x-scroll scrollbar-hide">
  <div className="flex flex-nowrap gap-2 py-1">
    <button
      onClick={() => setSelectedSector(null)}
      className={`flex-shrink-0 ${
        isScrolled ? 'px-3 py-1 text-sm' : 'px-4 py-2 text-sm'
      } rounded-lg font-medium transition-all whitespace-nowrap ${
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
        className={`flex-shrink-0 ${
          isScrolled ? 'px-3 py-1 text-sm' : 'px-4 py-2 text-sm'
        } rounded-lg font-medium transition-all whitespace-nowrap ${
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
                <div className="md:w-3/4 p-4 md:p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <h3 className="text-lg font-bold text-white mb-2 md:mb-0">{investor.title}</h3>
                    <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
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
                  <p className="text-zinc-400 mt-3">{investor.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="flex items-center gap-2 text-emerald-400 text-sm">
                      <FiDollarSign />
                      Ticket: {investor.ticket}
                    </div>
                    <div className="flex items-center gap-2 text-blue-400 text-sm">
                      <FiGlobe />
                      Atuação: {investor.geography}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
