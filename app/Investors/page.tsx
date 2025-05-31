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
  <main className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-gray-900 to-black px-4 sm:px-6 lg:px-8 min-w-[320px]">
    {/* Background effects - optimized */}
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {[{
        className: "top-1/3 left-1/4 w-[300px] h-[300px] bg-emerald-500/10 blur-[150px]",
        duration: '8s'
      }, {
        className: "bottom-1/4 right-1/3 w-[400px] h-[400px] bg-cyan-500/10 blur-[180px]",
        duration: '12s'
      }, {
        className: "top-1/2 right-1/4 w-[250px] h-[250px] bg-blue-500/10 blur-[120px]",
        duration: '10s'
      }].map((style, idx) => (
        <div
          key={idx}
          className={`absolute rounded-full ${style.className}`}
          style={{
            animation: `pulse ${style.duration} ease-in-out infinite`,
            transform: 'translate3d(0,0,0)',
            willChange: 'transform, opacity'
          }}
        ></div>
      ))}
    </div>

    <div className="container mx-auto px-4 py-16 max-w-6xl relative z-10">
      <motion.div 
        className="text-center pt-10 pb-12 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl animate-[spin_15s_linear_infinite]"></div>

        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 8, delay: 0.2 }}
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
          transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed relative"
        >
          Encontre uma empresa com matching perfeito entre indicadores{' '}
          <span className="relative inline-block">
            <span className="text-emerald-300 font-medium relative z-10">ESG</span>
            <span className="absolute bottom-0 left-0 w-full h-px bg-emerald-400/50 animate-[scaleX_4s_ease-in-out_infinite] origin-left"></span>
          </span>{' '}e indicadores{' '}
          <span className="relative inline-block">
            <span className="text-blue-300 font-medium relative z-10">Financeiros</span>
            <span className="absolute bottom-0 left-0 w-full h-px bg-blue-400/50 animate-[scaleX_4s_ease-in-out_infinite] origin-left"></span>
          </span>.
        </motion.p>
      </motion.div>

      <motion.div 
        className={`mb-12 sticky top-0 z-30 transition-all duration-300 ${isScrolled ? 'py-3' : 'py-5'}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 15 }}
        style={{ willChange: 'transform, opacity' }}
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6">
            <motion.h3
              className={`${isScrolled ? 'text-base' : 'text-lg'} font-bold text-white flex items-center gap-2`}
              whileHover={{ x: 3 }}
            >
              <motion.span
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, repeatType: "mirror", duration: 2, ease: "easeInOut" }}
                className="text-emerald-400"
              >
                <FiFilter />
              </motion.span>
              {isScrolled ? 'Filtros:' : 'Filtrar por Setor:'}
            </motion.h3>

            <div className="w-full relative">
              <div className="w-full overflow-x-auto scrollbar-hide pb-2">
                <div className="flex flex-nowrap gap-3 py-1 px-1">
                  <motion.button
                    onClick={() => setSelectedSector(null)}
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ y: -2 }}
                    className={`flex-shrink-0 px-5 py-2 rounded-xl font-medium transition-all whitespace-nowrap ${!selectedSector ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-xl shadow-emerald-500/40' : 'bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700 hover:text-white border border-zinc-700/50'}`}
                    style={{ willChange: 'transform' }}
                  >
                    Todos
                  </motion.button>

                  {sectorsList.map((sector, index) => (
                    <motion.button
                      key={sector}
                      onClick={() => setSelectedSector(sector)}
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.05 }}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex-shrink-0 px-5 py-2 rounded-xl font-medium transition-all whitespace-nowrap ${selectedSector === sector ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-xl shadow-emerald-500/40' : 'bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700 hover:text-white border border-zinc-700/50'}`}
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

      <div className="space-y-8">
        {filteredInvestors.map((investor, index) => (
          <motion.div
            key={investor.id}
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.7 + index * 0.08, type: "spring", stiffness: 120, damping: 10 }}
            whileHover={{ y: -5 }}
            className="group bg-zinc-900/80 border border-zinc-800/50 rounded-3xl overflow-hidden transition-all duration-300 cursor-pointer"
            onClick={() => navigateToInvestor(investor.id)}
            style={{ willChange: 'transform, opacity' }}
          >
            <div className="flex flex-col md:flex-row h-full">
              <div className="md:w-1/3 h-56 md:h-auto relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent md:bg-gradient-to-r md:from-black/80 md:via-black/50 md:to-transparent z-10"></div>
                <Image
                  src={investor.logo}
                  alt={investor.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority={index < 3}
                  loading={index < 3 ? "eager" : "lazy"}
                />
                <span className="absolute bottom-4 left-4 z-20 text-white font-bold text-xl md:text-2xl drop-shadow-lg">
                  {investor.name}
                </span>
              </div>

              <div className="md:w-2/3 p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors duration-300">
                      {investor.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {investor.sectors.map((sector, i) => (
                        <motion.span
                          key={sector}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.8 + index * 0.08 + i * 0.05 }}
                          className="px-3 py-1 bg-emerald-900/30 text-xs rounded-full text-emerald-300 border border-emerald-800/50"
                        >
                          {sector}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  <p className="text-zinc-400 truncate">{investor.description}</p>
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
