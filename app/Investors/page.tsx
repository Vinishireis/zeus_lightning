"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiFilter, FiDollarSign, FiGlobe, FiArrowRight } from "react-icons/fi";
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
    <main className="min-h-screen w-full flex items-center justify-center bg-black p-4">
    {/* Efeitos de background dinâmicos */}
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-emerald-500/10 blur-[150px] animate-[pulse_8s_ease-in-out_infinite]"></div>
      <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-[180px] animate-[pulse_12s_ease-in-out_infinite]"></div>
      <div className="absolute top-1/2 right-1/4 w-[250px] h-[250px] rounded-full bg-blue-500/10 blur-[120px] animate-[pulse_10s_ease-in-out_infinite]"></div>
    </div>

    <div className="container mx-auto px-4 py-16 max-w-6xl relative z-10">
      {/* Cabeçalho com efeito de destaque */}
      <motion.div 
        className="text-center pt-10 pb-12 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Efeito de brilho no título */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl animate-[spin_15s_linear_infinite]"></div>
        
        <motion.h1 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 80,
            damping: 8,
            delay: 0.2
          }}
          className="text-4xl md:text-6xl font-bold text-white mb-6 relative"
        >
          <span className="relative inline-block">
            Painel para <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent relative z-10">
              Investidores
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-emerald-400 to-cyan-400 opacity-80 animate-[pulse_3s_ease-in-out_infinite]"></span>
            </span>
          </span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            delay: 0.4,
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed relative"
        >
          Encontre uma empresa com matching perfeito entre indicadores{' '}
          <span className="relative inline-block">
            <span className="text-emerald-300 font-medium relative z-10">ESG</span>
            <span className="absolute bottom-0 left-0 w-full h-px bg-emerald-400/50 animate-[scaleX_4s_ease-in-out_infinite] origin-left"></span>
          </span>{' '}
          e indicadores{' '}
          <span className="relative inline-block">
            <span className="text-blue-300 font-medium relative z-10">Financeiros</span>
            <span className="absolute bottom-0 left-0 w-full h-px bg-blue-400/50 animate-[scaleX_4s_ease-in-out_infinite] origin-left"></span>
          </span>.
        </motion.p>
      </motion.div>

      {/* Filtro com efeito de vidro fosco */}
      <motion.div 
        className={`mb-12 sticky top-0 z-30 transition-all duration-500 ${
          isScrolled ? 'py-3 bg-zinc-950/80' : 'py-5 bg-zinc-950/60'
        } backdrop-blur-xl border-b border-zinc-800/50 rounded-xl mx-4`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          delay: 0.5,
          type: "spring",
          stiffness: 200,
          damping: 15
        }}
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6">
            <motion.h3 
              className={`${
                isScrolled ? 'text-base' : 'text-lg'
              } font-bold text-white flex items-center gap-2`}
              whileHover={{ x: 3 }}
            >
              <FiFilter className="text-emerald-400 animate-[pulse_2s_ease-in-out_infinite]" />
              {isScrolled ? 'Filtros:' : 'Filtrar por Setor:'}
            </motion.h3>
            
            {/* Barra de filtros premium */}
            <div className="w-full relative">
              <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-zinc-950 to-transparent z-20 pointer-events-none"></div>
              <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-zinc-950 to-transparent z-20 pointer-events-none"></div>
              
              <div className="w-full overflow-x-auto scrollbar-hide pb-2">
                <div className="flex flex-nowrap gap-3 py-1 px-1">
                  <motion.button
                    onClick={() => setSelectedSector(null)}
                    whileTap={{ scale: 0.92 }}
                    whileHover={{ y: -2, boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)' }}
                    className={`flex-shrink-0 ${
                      isScrolled ? 'px-5 py-2' : 'px-6 py-2.5'
                    } rounded-xl font-medium transition-all whitespace-nowrap ${
                      !selectedSector
                        ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-xl shadow-emerald-500/40'
                        : 'bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700 hover:text-white border border-zinc-700/50'
                    }`}
                  >
                    <span className="relative z-10">Todos</span>
                    {!selectedSector && (
                      <span className="absolute inset-0 bg-gradient-to-r from-emerald-500/30 to-transparent opacity-0 hover:opacity-100 transition-opacity rounded-xl"></span>
                    )}
                  </motion.button>
                  
                  {sectorsList.map((sector, index) => (
                    <motion.button
                      key={sector}
                      onClick={() => setSelectedSector(sector)}
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.05, type: "spring" }}
                      whileHover={{ 
                        y: -3,
                        boxShadow: selectedSector === sector 
                          ? '0 4px 14px rgba(16, 185, 129, 0.4)'
                          : '0 4px 14px rgba(39, 39, 42, 0.3)'
                      }}
                      whileTap={{ scale: 0.92 }}
                      className={`flex-shrink-0 ${
                        isScrolled ? 'px-5 py-2' : 'px-6 py-2.5'
                      } rounded-xl font-medium transition-all whitespace-nowrap relative overflow-hidden ${
                        selectedSector === sector
                          ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-xl shadow-emerald-500/40'
                          : 'bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700 hover:text-white border border-zinc-700/50'
                      }`}
                    >
                      <span className="relative z-10">{sector}</span>
                      {selectedSector === sector && (
                        <span className="absolute inset-0 bg-gradient-to-r from-emerald-500/30 to-transparent opacity-0 hover:opacity-100 transition-opacity rounded-xl"></span>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Lista de Investidores com efeitos premium */}
      <div className="space-y-8">
        {filteredInvestors.map((investor, index) => (
          <motion.div
            key={investor.id}
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              delay: 0.7 + index * 0.08,
              type: "spring",
              stiffness: 120,
              damping: 10
            }}
            whileHover={{ 
              y: -8,
              boxShadow: '0 20px 40px -10px rgba(16, 185, 129, 0.15)',
              borderColor: 'rgba(16, 185, 129, 0.4)'
            }}
            className="group bg-zinc-900/80 border border-zinc-800/50 rounded-3xl overflow-hidden transition-all duration-500 cursor-pointer relative"
            onClick={() => navigateToInvestor(investor.id)}
          >
            {/* Efeitos de brilho e destaque */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="flex flex-col md:flex-row h-full relative z-10">
              {/* Imagem com efeito de parallax */}
              <div className="md:w-1/3 h-56 md:h-auto relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent md:bg-gradient-to-r md:from-black/90 md:via-black/50 md:to-transparent z-10"></div>
                <motion.div 
                  className="h-full w-full"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Image
                    src={investor.logo}
                    alt={investor.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority={index < 3}
                  />
                </motion.div>
                <span className="absolute bottom-5 left-5 z-20 text-white font-bold text-xl md:text-2xl drop-shadow-2xl">
                  {investor.name}
                </span>
              </div>
              
              {/* Conteúdo com layout aprimorado */}
              <div className="md:w-2/3 p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                    <motion.h3
                      whileHover={{ x: 3 }}
                      className="text-xl md:text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors duration-300"
                    >
                      {investor.title}
                    </motion.h3>
                    <div className="flex flex-wrap gap-2">
                      {investor.sectors.map((sector, i) => (
                        <motion.span
                          key={sector}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.8 + index * 0.08 + i * 0.05 }}
                          whileHover={{ y: -2 }}
                          className="px-3 py-1.5 bg-emerald-900/40 text-xs rounded-full text-emerald-300 border border-emerald-800/60 hover:bg-emerald-900/60 transition-all duration-300"
                        >
                          {sector}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                  
                  <motion.p
                    whileHover={{ x: 2 }}
                    className="text-zinc-400 mt-4 leading-relaxed text-sm md:text-base"
                  >
                    {investor.description}
                  </motion.p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
                  {/* Card de Ticket */}
                  <motion.div
                    whileHover={{ y: -3 }}
                    className="flex items-center gap-4 p-4 bg-zinc-800/40 rounded-xl border border-zinc-700/50 hover:border-emerald-500/40 transition-all duration-300 group/item"
                  >
                    <div className="p-3 bg-emerald-900/30 rounded-lg text-emerald-400 group-hover/item:bg-emerald-900/50 transition-colors duration-300">
                      <FiDollarSign className="text-xl" />
                    </div>
                    <div>
                      <p className="text-xs text-zinc-400 mb-1">Ticket Médio</p>
                      <p className="text-emerald-400 font-medium text-lg">{investor.ticket}</p>
                    </div>
                    <FiArrowRight className="ml-auto text-zinc-500 group-hover/item:text-emerald-400 transition-colors duration-300" />
                  </motion.div>
                  
                  {/* Card de Atuação */}
                  <motion.div
                    whileHover={{ y: -3 }}
                    className="flex items-center gap-4 p-4 bg-zinc-800/40 rounded-xl border border-zinc-700/50 hover:border-blue-500/40 transition-all duration-300 group/item"
                  >
                    <div className="p-3 bg-blue-900/30 rounded-lg text-blue-400 group-hover/item:bg-blue-900/50 transition-colors duration-300">
                      <FiGlobe className="text-xl" />
                    </div>
                    <div>
                      <p className="text-xs text-zinc-400 mb-1">Área de Atuação</p>
                      <p className="text-blue-400 font-medium text-lg">{investor.geography}</p>
                    </div>
                    <FiArrowRight className="ml-auto text-zinc-500 group-hover/item:text-blue-400 transition-colors duration-300" />
                  </motion.div>
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
