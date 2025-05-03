"use client";

import { motion } from "framer-motion";
import { FiFilter, FiArrowRight } from "react-icons/fi";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect } from "react";

// Imagens fictícias para as empresas (substitua por suas próprias imagens)
import EmpresaVerdeImg from '@/public/empresa-verde.jpg';
import AquaCleanImg from '@/public/aqua-clean.jpg';
import OceanoVivoImg from '@/public/oceano-vivo.jpg';
import EcoEducaImg from '@/public/eco-educa.jpg';
import SolarPowerImg from '@/public/solar-power.jpg';

export default function ServicesPage() {
  const [selectedOds, setSelectedOds] = useState<number | null>(null);
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      id: "preservacao-reflorestamento",
      company: "Empresa Verde",
      logo: EmpresaVerdeImg,
      title: "Preservação e Reflorestamento",
      description: "Especializada em recuperação de áreas degradadas e plantio de árvores nativas com técnicas inovadoras.",
      ods: [13, 15]
    },
    {
      id: "limpeza-rios",
      company: "Aqua Clean",
      logo: AquaCleanImg,
      title: "Limpeza de Rios",
      description: "Tecnologia avançada para remoção de resíduos e despoluição de cursos d'água em áreas urbanas.",
      ods: [6, 14]
    },
    {
      id: "limpeza-praias",
      company: "Oceano Vivo",
      logo: OceanoVivoImg,
      title: "Limpeza de Praias e Mares",
      description: "Ações de coleta de lixo marinho com equipes especializadas e equipamentos de última geração.",
      ods: [6, 14, 12]
    },
    {
      id: "educacao-treinamento",
      company: "Eco Educa",
      logo: EcoEducaImg,
      title: "Educação e Treinamento",
      description: "Programas de capacitação em sustentabilidade para comunidades carentes e escolas públicas.",
      ods: [4, 5, 10]
    },
    {
      id: "energia-sustentavel",
      company: "Solar Power",
      logo: SolarPowerImg,
      title: "Geração de Energia Sustentável",
      description: "Instalação de sistemas de energia renovável acessíveis para comunidades de baixa renda.",
      ods: [7, 8, 11]
    }
  ];

  const odsList = [4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15];

  const filteredServices = selectedOds
    ? services.filter(service => service.ods.includes(selectedOds))
    : services;

  const navigateToService = (serviceId: string) => {
    router.push(`/Services/${serviceId}`);
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
            Empresas de <span className="bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">Serviços Sustentáveis</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-lg text-zinc-400 max-w-3xl mx-auto"
          >
            Conheça as empresas especializadas em soluções alinhadas com os ODS da ONU.
          </motion.p>
        </div>

        {/* Filtro */}
        <motion.div 
  className={`mb-12 sticky top-0 z-10 bg-zinc-900/90 backdrop-blur-sm border-b border-blue-800/50 transition-all duration-300 ${
    isScrolled ? 'py-2' : 'py-4'
  }`}
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.3 }}
>
  <div className="container mx-auto px-4">
    <div className={`flex flex-col md:flex-row items-center justify-between gap-3 ${
      isScrolled ? 'md:gap-2' : 'md:gap-4'
    } transition-all duration-300`}>
      <h3 className={`${
        isScrolled ? 'text-lg' : 'text-xl'
      } font-bold text-white flex items-center gap-2 transition-all duration-300`}>
        <FiFilter className="text-blue-400" />
        {isScrolled ? 'ODS:' : 'Filtrar por ODS:'}
      </h3>
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => setSelectedOds(null)}
          className={`${
            isScrolled ? 'px-3 py-1 text-sm' : 'px-4 py-2'
          } rounded-lg font-medium transition-all ${
            !selectedOds 
              ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' 
              : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white'
          }`}
        >
          Todos
        </button>
        {odsList.map(ods => (
          <button
            key={ods}
            onClick={() => setSelectedOds(ods)}
            className={`${
              isScrolled ? 'px-3 py-1 text-sm' : 'px-4 py-2'
            } rounded-lg font-medium transition-all ${
              selectedOds === ods 
                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' 
                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white'
            }`}
          >
            {isScrolled ? ods : `ODS ${ods}`}
          </button>
        ))}
      </div>
    </div>
  </div>
</motion.div>

        {/* Lista de Empresas */}
        <div className="space-y-6">
          {filteredServices.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-700 transition-all duration-300 cursor-pointer"
              onClick={() => navigateToService(service.id)}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex flex-col md:flex-row">
                {/* Imagem da Empresa */}
                <div className="md:w-1/4 h-48 md:h-auto relative">
                  <Image
                    src={service.logo}
                    alt={service.company}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent md:bg-gradient-to-r md:from-black/70 md:to-transparent flex items-end p-4">
                    <span className="text-white font-bold text-lg">{service.company}</span>
                  </div>
                </div>

                {/* Detalhes do Serviço */}
                <div className="md:w-3/4 p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {service.ods.map(ods => (
                        <span 
                          key={ods} 
                          className="px-3 py-1 bg-blue-900/20 text-xs rounded-full text-blue-300 border border-blue-800/50"
                        >
                          ODS {ods}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-zinc-400 mb-4">{service.description}</p>
                  
                  <div className="flex items-center text-blue-400 group">
                    <span className="text-sm font-medium group-hover:underline">Ver detalhes da empresa</span>
                    <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mensagem quando não há resultados */}
        {filteredServices.length === 0 && (
          <div className="text-center py-20">
            <p className="text-zinc-400 text-lg">Nenhuma empresa encontrada com o filtro selecionado.</p>
            <button
              onClick={() => setSelectedOds(null)}
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
            >
              Limpar filtros
            </button>
          </div>
        )}
      </div>
    </main>
  );
}