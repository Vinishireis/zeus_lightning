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
  <main className="min-h-screen w-full bg-black relative overflow-x-hidden">
    {/* Efeitos de background otimizados */}
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Backgrounds otimizados para mobile */}
      <div className="absolute top-1/3 left-1/4 w-[200px] h-[200px] md:w-[300px] md:h-[300px] rounded-full bg-emerald-500/10 blur-[80px] md:blur-[150px] animate-[pulse_8s_ease-in-out_infinite]"></div>
      <div className="absolute bottom-1/4 right-1/3 w-[250px] h-[250px] md:w-[400px] md:h-[400px] rounded-full bg-cyan-500/10 blur-[100px] md:blur-[180px] animate-[pulse_12s_ease-in-out_infinite]"></div>
      <div className="absolute top-1/2 right-1/4 w-[180px] h-[180px] md:w-[250px] md:h-[250px] rounded-full bg-blue-500/10 blur-[60px] md:blur-[120px] animate-[pulse_10s_ease-in-out_infinite]"></div>
    </div>

    <div className="container mx-auto px-4 sm:px-6 py-12 md:py-16 max-w-6xl relative z-10">
      {/* Cabeçalho otimizado */}
      <motion.div 
        className="text-center pt-8 md:pt-10 pb-10 md:pb-12 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 100,
            damping: 10,
            delay: 0.2
          }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6"
        >
          Painel para <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Investidores
          </span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ 
            delay: 0.3,
            duration: 0.8
          }}
          className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed px-2"
        >
          Encontre uma empresa com matching perfeito entre indicadores{' '}
          <span className="text-emerald-300 font-medium">ESG</span> e indicadores{' '}
          <span className="text-blue-300 font-medium">Financeiros</span>.
        </motion.p>
      </motion.div>

      {/* Filtro otimizado para mobile */}
      <motion.div 
        className={`mb-8 md:mb-12 sticky top-0 z-30 bg-zinc-950/80 backdrop-blur-sm md:backdrop-blur-lg border-b border-zinc-800 transition-all duration-300 ${
          isScrolled ? 'py-2' : 'py-3 md:py-4'
        }`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="container mx-auto px-2 sm:px-4 max-w-6xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 md:gap-6">
            <h3 className="text-sm sm:text-base md:text-lg font-bold text-white flex items-center gap-2">
              <FiFilter className="text-emerald-400" />
              {isScrolled ? 'Filtros:' : 'Filtrar por Setor:'}
            </h3>
            
            <div className="w-full relative">
              <div className="absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-zinc-950 to-transparent z-20 pointer-events-none"></div>
              <div className="absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-zinc-950 to-transparent z-20 pointer-events-none"></div>
              
              <div className="w-full overflow-x-auto scrollbar-hide pb-1">
                <div className="flex flex-nowrap gap-2 py-1">
                  <button
                    onClick={() => setSelectedSector(null)}
                    className={`flex-shrink-0 px-3 sm:px-4 py-1.5 sm:py-2 text-sm rounded-lg font-medium transition-all whitespace-nowrap ${
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
                      className={`flex-shrink-0 px-3 sm:px-4 py-1.5 sm:py-2 text-sm rounded-lg font-medium transition-all whitespace-nowrap ${
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
        </div>
      </motion.div>

      {/* Lista de Investidores otimizada */}
      <div className="space-y-4 sm:space-y-6">
        {filteredInvestors.map((investor, index) => (
          <motion.div
            key={investor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 0.5 + index * 0.05,
              type: "spring",
              stiffness: 150
            }}
            className="bg-zinc-900/70 border border-zinc-800 rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer"
            onClick={() => navigateToInvestor(investor.id)}
          >
            <div className="flex flex-col sm:flex-row">
              {/* Imagem responsiva */}
              <div className="sm:w-1/3 h-48 sm:h-auto relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent sm:bg-gradient-to-r sm:from-black/80 sm:to-transparent z-10"></div>
                <Image
                  src={investor.logo}
                  alt={investor.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  priority={index < 3}
                />
                <span className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-20 text-white font-bold text-lg sm:text-xl">
                  {investor.name}
                </span>
              </div>
              
              {/* Conteúdo otimizado */}
              <div className="sm:w-2/3 p-4 sm:p-5 md:p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4">
                  <h3 className="text-lg sm:text-xl font-bold text-white">{investor.title}</h3>
                  <div className="flex flex-wrap gap-1 sm:gap-2 mt-1 sm:mt-0">
                    {investor.sectors.map(sector => (
                      <span 
                        key={sector} 
                        className="px-2 sm:px-3 py-0.5 sm:py-1 bg-emerald-900/30 text-xs rounded-full text-emerald-300 border border-emerald-800/50"
                      >
                        {sector}
                      </span>
                    ))}
                  </div>
                </div>
                
                <p className="text-zinc-400 mt-2 sm:mt-3 text-sm sm:text-base">
                  {investor.description}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4 sm:mt-5">
                  <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-zinc-800/30 rounded-lg">
                    <div className="p-1 sm:p-2 bg-emerald-900/20 rounded-md text-emerald-400">
                      <FiDollarSign className="text-sm sm:text-base" />
                    </div>
                    <div>
                      <p className="text-xs text-zinc-400">Ticket</p>
                      <p className="text-emerald-400 font-medium text-sm sm:text-base">{investor.ticket}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-zinc-800/30 rounded-lg">
                    <div className="p-1 sm:p-2 bg-blue-900/20 rounded-md text-blue-400">
                      <FiGlobe className="text-sm sm:text-base" />
                    </div>
                    <div>
                      <p className="text-xs text-zinc-400">Atuação</p>
                      <p className="text-blue-400 font-medium text-sm sm:text-base">{investor.geography}</p>
                    </div>
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
