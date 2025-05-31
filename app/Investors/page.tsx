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
    <main className="min-h-screen w-full flex items-center justify-center bg-black p-4">
    <div className="container mx-auto px-4 py-16 max-w-6xl relative z-10">
      {/* Cabeçalho com animação refinada */}
      <motion.div 
        className="text-center pt-10 pb-12"
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
            delay: 0.1
          }}
          className="text-4xl md:text-5xl font-bold text-white mb-6"
        >
          Painel para <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent relative">
            Investidores
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-emerald-400 to-cyan-400 opacity-70"></span>
          </span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ 
            delay: 0.3,
            duration: 0.8
          }}
          className="text-lg text-zinc-400 max-w-3xl mx-auto leading-relaxed"
        >
          Encontre uma empresa com matching perfeito entre indicadores <span className="text-emerald-300 font-medium">ESG</span> e indicadores <span className="text-blue-300 font-medium">Financeiros</span>.
        </motion.p>
      </motion.div>

      {/* Filtro com efeito sticky melhorado */}
      <motion.div 
        className={`mb-12 sticky top-0 z-30 transition-all duration-300 ${
          isScrolled ? 'py-3' : 'py-5'
        }`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          delay: 0.4,
          type: "spring",
          stiffness: 300
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
              <FiFilter className="text-emerald-400" />
              {isScrolled ? 'Filtros:' : 'Filtrar por Setor:'}
            </motion.h3>
            
            {/* Barra de filtros com scroll horizontal melhorado */}
            <div className="w-full relative">
              <div className="absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-zinc-950 to-transparent z-20 pointer-events-none"></div>
              <div className="absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-zinc-950 to-transparent z-20 pointer-events-none"></div>
              
              <div className="w-full overflow-x-auto scrollbar-hide pb-2">
                <div className="flex flex-nowrap gap-2 py-1 px-1">
                  <motion.button
                    onClick={() => setSelectedSector(null)}
                    whileTap={{ scale: 0.95 }}
                    className={`flex-shrink-0 ${
                      isScrolled ? 'px-4 py-1.5' : 'px-5 py-2'
                    } rounded-lg font-medium transition-all whitespace-nowrap ${
                      !selectedSector
                        ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30'
                        : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white'
                    }`}
                  >
                    Todos
                  </motion.button>
                  
                  {sectorsList.map((sector, index) => (
                    <motion.button
                      key={sector}
                      onClick={() => setSelectedSector(sector)}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.05 }}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex-shrink-0 ${
                        isScrolled ? 'px-4 py-1.5' : 'px-5 py-2'
                      } rounded-lg font-medium transition-all whitespace-nowrap ${
                        selectedSector === sector
                          ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30'
                          : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white'
                      }`}
                    >
                      {sector}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Lista de Investidores com animações em cascata */}
      <div className="space-y-6">
        {filteredInvestors.map((investor, index) => (
          <motion.div
            key={investor.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 0.6 + index * 0.07,
              type: "spring",
              stiffness: 150
            }}
            whileHover={{ 
              y: -5,
              boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.1)'
            }}
            className="group bg-zinc-900/70 border border-zinc-800 rounded-2xl overflow-hidden hover:border-emerald-500/30 transition-all duration-300 cursor-pointer relative"
            onClick={() => navigateToInvestor(investor.id)}
          >
            {/* Efeito de brilho hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            
            <div className="flex flex-col md:flex-row h-full">
              {/* Imagem com overlay e efeito de zoom */}
              <div className="md:w-1/4 h-48 md:h-auto relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent md:bg-gradient-to-r md:from-black/80 md:via-black/30 md:to-transparent z-10"></div>
                <motion.div 
                  className="h-full w-full"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                >
                  <Image
                    src={investor.logo}
                    alt={investor.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 25vw"
                    priority={index < 3}
                  />
                </motion.div>
                <span className="absolute bottom-4 left-4 z-20 text-white font-bold text-lg drop-shadow-lg">
                  {investor.name}
                </span>
              </div>
              
              {/* Conteúdo textual */}
              <div className="md:w-3/4 p-5 md:p-6 flex flex-col justify-between">
                <div>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                      {investor.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {investor.sectors.map((sector, i) => (
                        <motion.span
                          key={sector}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.7 + index * 0.07 + i * 0.05 }}
                          className="px-3 py-1 bg-emerald-900/30 text-xs rounded-full text-emerald-300 border border-emerald-800/50 hover:bg-emerald-900/50 transition-colors"
                        >
                          {sector}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-zinc-400 mt-3 leading-relaxed">
                    {investor.description}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="flex items-center gap-3 p-3 bg-zinc-800/30 rounded-lg border border-zinc-700/50 hover:border-emerald-500/30 transition-colors">
                    <div className="p-2 bg-emerald-900/20 rounded-lg text-emerald-400">
                      <FiDollarSign className="text-lg" />
                    </div>
                    <div>
                      <p className="text-xs text-zinc-400">Ticket</p>
                      <p className="text-emerald-400 font-medium">{investor.ticket}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-zinc-800/30 rounded-lg border border-zinc-700/50 hover:border-blue-500/30 transition-colors">
                    <div className="p-2 bg-blue-900/20 rounded-lg text-blue-400">
                      <FiGlobe className="text-lg" />
                    </div>
                    <div>
                      <p className="text-xs text-zinc-400">Atuação</p>
                      <p className="text-blue-400 font-medium">{investor.geography}</p>
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
