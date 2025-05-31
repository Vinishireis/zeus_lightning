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
    {/* Optimized background effects with reduced repaints */}
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div 
        className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-emerald-500/10 blur-[150px]"
        style={{
          animation: 'pulse 8s ease-in-out infinite',
          transform: 'translate3d(0,0,0)',
          willChange: 'transform, opacity'
        }}
      ></div>
      <div 
        className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-[180px]"
        style={{
          animation: 'pulse 12s ease-in-out infinite',
          transform: 'translate3d(0,0,0)',
          willChange: 'transform, opacity'
        }}
      ></div>
      <div 
        className="absolute top-1/2 right-1/4 w-[250px] h-[250px] rounded-full bg-blue-500/10 blur-[120px]"
        style={{
          animation: 'pulse 10s ease-in-out infinite',
          transform: 'translate3d(0,0,0)',
          willChange: 'transform, opacity'
        }}
      ></div>
    </div>

    <div className="container mx-auto px-4 py-16 max-w-6xl relative z-10">
      {/* Optimized header with reduced motion */}
      <motion.div 
        className="text-center pt-10 pb-12 relative"
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
          className="text-4xl md:text-5xl font-bold text-white mb-6"
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
          className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed"
        >
          Encontre uma empresa com matching perfeito entre indicadores{' '}
          <span className="text-emerald-300 font-medium">ESG</span> e indicadores{' '}
          <span className="text-blue-300 font-medium">Financeiros</span>.
        </motion.p>
      </motion.div>

      {/* Optimized sticky filter bar */}
      <motion.div 
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled ? 'py-3 ' : 'py-4'
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          delay: 0.4,
          type: "spring",
          stiffness: 300,
          damping: 20
        }}
        style={{ willChange: 'transform, opacity' }}
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6">
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ x: 3 }}
            >
              <motion.span
                animate={{
                  rotate: [0, 5, -5, 0],
                  transition: {
                    repeat: Infinity,
                    repeatType: "mirror",
                    duration: 2,
                    ease: "easeInOut"
                  }
                }}
                className="text-emerald-400 inline-block"
              >
                <FiFilter />
              </motion.span>
              <span className={`${
                isScrolled ? 'text-base' : 'text-lg'
              } font-bold text-white`}>
                {isScrolled ? 'Filtros:' : 'Filtrar por Setor:'}
              </span>
            </motion.div>
            
            <div className="w-full relative">
              <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-zinc-950 to-transparent z-20 pointer-events-none"></div>
              <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-zinc-950 to-transparent z-20 pointer-events-none"></div>
              
              <div className="w-full overflow-x-auto scrollbar-hide pb-1">
                <div className="flex flex-nowrap gap-2 py-1">
                  <motion.button
                    onClick={() => setSelectedSector(null)}
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ y: -2 }}
                    className={`flex-shrink-0 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                      !selectedSector
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                    }`}
                    style={{ willChange: 'transform' }}
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
                      className={`flex-shrink-0 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                        selectedSector === sector
                          ? 'bg-emerald-600 text-white shadow-md'
                          : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                      }`}
                      style={{ willChange: 'transform' }}
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

      {/* Optimized investor cards list */}
      <div className="space-y-6 mt-8">
        {filteredInvestors.map((investor, index) => (
          <motion.div
            key={investor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 0.6 + index * 0.07,
              type: "spring",
              stiffness: 150,
              damping: 10
            }}
            whileHover={{ 
              y: -5,
              boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.1)'
            }}
            className="bg-zinc-900/80 border border-zinc-800 rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer"
            onClick={() => navigateToInvestor(investor.id)}
            style={{ willChange: 'transform, opacity' }}
          >
            <div className="flex flex-col md:flex-row">
              {/* Optimized image with priority loading */}
              <div className="md:w-1/3 h-56 md:h-auto relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent md:bg-gradient-to-r md:from-black/80 md:to-transparent z-10"></div>
                <Image
                  src={investor.logo}
                  alt={investor.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority={index < 3}
                  loading={index < 3 ? "eager" : "lazy"}
                />
                <span className="absolute bottom-4 left-4 z-20 text-white font-bold text-xl">
                  {investor.name}
                </span>
              </div>
              
              <div className="md:w-2/3 p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                  <h3 className="text-xl font-bold text-white">{investor.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {investor.sectors.map((sector, i) => (
                      <motion.span
                        key={sector}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7 + index * 0.07 + i * 0.03 }}
                        className="px-3 py-1 bg-emerald-900/30 text-emerald-300 text-xs rounded-full border border-emerald-800/50"
                      >
                        {sector}
                      </motion.span>
                    ))}
                  </div>
                </div>
                
                <p className="text-zinc-400 mt-3 mb-6">
                  {investor.description}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-zinc-800/30 rounded-lg">
                    <div className="p-2 bg-emerald-900/20 rounded-lg text-emerald-400">
                      <FiDollarSign />
                    </div>
                    <div>
                      <p className="text-xs text-zinc-400">Ticket</p>
                      <p className="text-emerald-400 font-medium">{investor.ticket}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-zinc-800/30 rounded-lg">
                    <div className="p-2 bg-blue-900/20 rounded-lg text-blue-400">
                      <FiGlobe />
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
