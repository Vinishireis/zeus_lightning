"use client";

import { motion } from "framer-motion";
import { FiFilter, FiArrowRight } from "react-icons/fi";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect } from "react";

// Imagens fictícias para as empresas (substitua por suas próprias imagens)
import EmpresaVerdeImg from "@/public/empresa-verde.jpg";
import AquaCleanImg from "@/public/aqua-clean.jpg";
import OceanoVivoImg from "@/public/oceano-vivo.jpg";
import EcoEducaImg from "@/public/eco-educa.jpg";
import SolarPowerImg from "@/public/solar-power.jpg";

export default function ServicesPage() {
  const [selectedOds, setSelectedOds] = useState<number | null>(null);
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const services = [
    {
      id: "preservacao-reflorestamento",
      company: "Empresa Verde",
      logo: EmpresaVerdeImg,
      title: "Preservação e Reflorestamento",
      description:
        "Especializada em recuperação de áreas degradadas e plantio de árvores nativas com técnicas inovadoras.",
      ods: [13, 15],
    },
    {
      id: "limpeza-rios",
      company: "Aqua Clean",
      logo: AquaCleanImg,
      title: "Limpeza de Rios",
      description:
        "Tecnologia avançada para remoção de resíduos e despoluição de cursos d'água em áreas urbanas.",
      ods: [6, 14],
    },
    {
      id: "limpeza-praias",
      company: "Oceano Vivo",
      logo: OceanoVivoImg,
      title: "Limpeza de Praias e Mares",
      description:
        "Ações de coleta de lixo marinho com equipes especializadas e equipamentos de última geração.",
      ods: [6, 14, 12],
    },
    {
      id: "educacao-treinamento",
      company: "Eco Educa",
      logo: EcoEducaImg,
      title: "Educação e Treinamento",
      description:
        "Programas de capacitação em sustentabilidade para comunidades carentes e escolas públicas.",
      ods: [4, 5, 10],
    },
    {
      id: "energia-sustentavel",
      company: "Solar Power",
      logo: SolarPowerImg,
      title: "Geração de Energia Sustentável",
      description:
        "Instalação de sistemas de energia renovável acessíveis para comunidades de baixa renda.",
      ods: [7, 8, 11],
    },
  ];

  const odsList = [4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15];

  const filteredServices = selectedOds
    ? services.filter((service) => service.ods.includes(selectedOds))
    : services;

  const navigateToService = (serviceId: string) => {
    router.push(`/Services/${serviceId}`);
  };

return (
  <main className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-gray-900 to-black px-4 sm:px-6 lg:px-8 min-w-[320px]">
    {/* Background effects - optimized */}
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {[{
        className: "top-1/3 left-1/4 w-[300px] h-[300px] bg-blue-500/10 blur-[150px]",
        duration: '8s'
      }, {
        className: "bottom-1/4 right-1/3 w-[400px] h-[400px] bg-indigo-500/10 blur-[180px]",
        duration: '12s'
      }, {
        className: "top-1/2 right-1/4 w-[250px] h-[250px] bg-cyan-500/10 blur-[120px]",
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
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-[spin_15s_linear_infinite]"></div>

        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 8, delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold text-white mb-6 relative"
        >
          <span className="relative inline-block">
            Empresas de <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent relative z-10">
              Serviços Sustentáveis
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-80 animate-[pulse_3s_ease-in-out_infinite]"></span>
            </span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed relative"
        >
          Conheça as empresas especializadas em soluções alinhadas com os{' '}
          <span className="relative inline-block">
            <span className="text-blue-300 font-medium relative z-10">ODS</span>
            <span className="absolute bottom-0 left-0 w-full h-px bg-blue-400/50 animate-[scaleX_4s_ease-in-out_infinite] origin-left"></span>
          </span>{' '}da ONU.
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
                className="text-blue-400"
              >
                <FiFilter />
              </motion.span>
              {isScrolled ? 'Filtros:' : 'Filtrar por ODS:'}
            </motion.h3>

            <div className="w-full relative">
              <div className="w-full overflow-x-auto scrollbar-hide pb-2">
                <div className="flex flex-nowrap gap-3 py-1 px-1">
                  <motion.button
                    onClick={() => setSelectedOds(null)}
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ y: -2 }}
                    className={`flex-shrink-0 px-5 py-2 rounded-xl font-medium transition-all whitespace-nowrap ${!selectedOds ? 'bg-gradient-to-br from-blue-500 to-cyan-600 text-white shadow-xl shadow-blue-500/40' : 'bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700 hover:text-white border border-zinc-700/50'}`}
                    style={{ willChange: 'transform' }}
                  >
                    Todos
                  </motion.button>

                  {odsList.map((ods, index) => (
                    <motion.button
                      key={ods}
                      onClick={() => setSelectedOds(ods)}
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.05 }}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex-shrink-0 px-5 py-2 rounded-xl font-medium transition-all whitespace-nowrap ${selectedOds === ods ? 'bg-gradient-to-br from-blue-500 to-cyan-600 text-white shadow-xl shadow-blue-500/40' : 'bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700 hover:text-white border border-zinc-700/50'}`}
                      style={{ willChange: 'transform' }}
                    >
                      ODS {ods}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="space-y-8">
        {filteredServices.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.7 + index * 0.08, type: "spring", stiffness: 120, damping: 10 }}
            whileHover={{ y: -5 }}
            className="group bg-zinc-900/80 border border-zinc-800/50 rounded-3xl overflow-hidden transition-all duration-300 cursor-pointer"
            onClick={() => navigateToService(service.id)}
            style={{ willChange: 'transform, opacity' }}
          >
            <div className="flex flex-col md:flex-row h-full">
              <div className="md:w-1/3 h-56 md:h-auto relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent md:bg-gradient-to-r md:from-black/80 md:via-black/50 md:to-transparent z-10"></div>
                <Image
                  src={service.logo}
                  alt={service.company}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority={index < 3}
                />
                <span className="absolute bottom-4 left-4 z-20 text-white font-bold text-xl md:text-2xl drop-shadow-lg">
                  {service.company}
                </span>
              </div>

              <div className="md:w-2/3 p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
                      {service.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {service.ods.map((ods, i) => (
                        <motion.span
                          key={ods}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.8 + index * 0.08 + i * 0.05 }}
                          className="px-3 py-1 bg-blue-900/30 text-xs rounded-full text-blue-300 border border-blue-800/50"
                        >
                          ODS {ods}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  <p className="text-zinc-400 mb-4">{service.description}</p>
                  
                  <div className="flex items-center text-blue-400 group">
                    <span className="text-sm font-medium group-hover:underline">
                      Ver detalhes da empresa
                    </span>
                    <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mensagem quando não há resultados */}
      {filteredServices.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <p className="text-zinc-400 text-lg mb-4">
            Nenhuma empresa encontrada com o filtro selecionado.
          </p>
          <motion.button
            onClick={() => setSelectedOds(null)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-gradient-to-br from-blue-500 to-cyan-600 text-white rounded-xl font-medium shadow-lg shadow-blue-500/30"
          >
            Limpar filtros
          </motion.button>
        </motion.div>
      )}
    </div>
  </main>
);
}
