"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiFilter, FiDollarSign, FiGlobe } from "react-icons/fi";
import { useRouter } from "next/navigation";
import Image from "next/image";

import CapitalForteImg from '@/public/capital-verde.png';
import FoodInvestImg from '@/public/eco-fund.png';
import MercadoGlobalImg from '@/public/sustain-ventures.png';
import AgroFoodImg from '@/public/green-growth.png';
import DistribuidoraInvestImg from '@/public/earth-capital.png';
import TraditionalGrowthImg from '@/public/TraditionalGrowthImg.png';

export default function InvestorsPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
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
      id: "capital-forte",
      name: "Capital Forte",
      logo: CapitalForteImg,
      title: "Fundo de Investimento em Atacado",
      description: "Foco em distribuidoras e empresas atacadistas com potencial de expansão regional.",
      sectors: ["Atacado", "Logística", "Distribuição"],
      ticket: "R$ 1M - R$ 10M",
      geography: "Brasil"
    },
    {
      id: "food-invest",
      name: "Food Invest Partners",
      logo: FoodInvestImg,
      title: "Especialistas em Alimentício",
      description: "Investimos em empresas de alimentos, bebidas e insumos para o setor.",
      sectors: ["Alimentício", "Bebidas", "Ingredientes"],
      ticket: "R$ 500K - R$ 5M",
      geography: "América Latina"
    },
    {
      id: "mercado-global",
      name: "Mercado Global Capital",
      logo: MercadoGlobalImg,
      title: "Investimento em Comércio Atacadista",
      description: "Apoiamos redes de atacado e distribuição com modelos comprovados.",
      sectors: ["Atacado", "Distribuição", "Varejo Corporativo"],
      ticket: "R$ 2M+",
      geography: "Global"
    },
    {
      id: "agro-food-capital",
      name: "Agro Food Capital",
      logo: AgroFoodImg,
      title: "Foco em Alimentos e Agroindústria",
      description: "Parceiros estratégicos para empresas de processamento e comercialização de alimentos.",
      sectors: ["Agroindústria", "Alimentos Processados", "Commodities Agrícolas"],
      ticket: "R$ 3M - R$ 15M",
      geography: "América do Sul"
    },
    {
      id: "distribuidora-invest",
      name: "Distribuidora Invest",
      logo: DistribuidoraInvestImg,
      title: "Especialistas em Redes de Distribuição",
      description: "Capital de crescimento para redes de distribuição e atacado consolidados.",
      sectors: ["Atacado", "Distribuição", "Logística"],
      ticket: "R$ 5M+",
      geography: "Brasil"
    },
    {
      id: "traditional-growth",
      name: "Traditional Growth Partners",
      logo: TraditionalGrowthImg,
      title: "Private Equity para Setores Tradicionais",
      description: "Investimos em empresas maduras de setores convencionais com fluxo estável.",
      sectors: ["Manufatura", "Atacado", "Alimentício"],
      ticket: "R$ 10M+",
      geography: "Global"
    }
  ];

  const sectorsList = [
    "Atacado", "Distribuição", "Alimentício", "Bebidas", "Agroindústria", "Logística", "Manufatura",
    "Comércio Exterior", "Serviços Corporativos", "Embalagens", "Equipamentos Industriais", "Químicos",
    "Ingredientes", "Carnes e Derivados", "Grãos e Cereais", "Varejo Corporativo", "Transporte de Cargas", "Armazenagem"
  ];

  const filteredInvestors = selectedSector
    ? investors.filter(investor => investor.sectors.includes(selectedSector))
    : investors;

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
          className={`mb-12 sticky top-0 z-30 bg-zinc-900/90 backdrop-blur-sm border-b border-zinc-800 transition-all duration-300 ${
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
