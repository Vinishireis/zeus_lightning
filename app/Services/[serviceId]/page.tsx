"use client";

import { motion } from "framer-motion";
import {
  FiArrowLeft,
  FiStar,
  FiCheck,
  FiClock,
  FiDollarSign,
  FiMapPin,
} from "react-icons/fi";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// Tipos para melhorar a segurança do código
type Project = {
  name: string;
  location: string;
  trees?: number;
  length?: string;
  students?: number;
  systems?: number;
  area?: string;
};

type Pricing = {
  option: string;
  price: string;
  details: string;
};

type Service = {
  company: string;
  logo: string;
  title: string;
  description: string;
  reviews: number;
  since: number;
  ods: number[];
  fullDescription: string;
  benefits: string[];
  projects: Project[];
  pricing: Pricing[];
};

// Defina o tipo do companyData para melhor tipagem
const companyData: Record<string, Service> = {
  "preservacao-reflorestamento": {
    company: "Empresa Verde",
    logo: "/empresa-verde.jpg",
    title: "Preservação e Reflorestamento",
    description:
      "Especializada em recuperação de áreas degradadas e plantio de árvores nativas com técnicas inovadoras.",
    reviews: 124,
    since: 2015,
    ods: [13, 15],
    fullDescription:
      "A Empresa Verde é líder em projetos de reflorestamento, utilizando técnicas avançadas de recuperação de áreas degradadas. Nossos métodos incluem análise de solo personalizada, seleção de espécies nativas e monitoramento pós-plantio para garantir o sucesso do reflorestamento.",
    benefits: [
      "Recuperação de áreas degradadas",
      "Plantio de espécies nativas",
      "Monitoramento por 3 anos",
      "Relatórios de impacto ambiental",
      "Certificado de sustentabilidade",
    ],
    projects: [
      { name: "Reflorestamento Serra do Mar", location: "SP", trees: 15000 },
      { name: "Recuperação Mata Ciliar", location: "MG", trees: 8200 },
      { name: "Projeto Carbono Zero", location: "RJ", trees: 22500 },
    ],
    pricing: [
      {
        option: "Pacote Básico",
        price: "R$ 15.000",
        details: "Até 5 hectares",
      },
      {
        option: "Pacote Intermediário",
        price: "R$ 28.000",
        details: "5 a 15 hectares",
      },
      {
        option: "Pacote Completo",
        price: "R$ 50.000",
        details: "Acima de 15 hectares",
      },
    ],
  },
  "limpeza-rios": {
    company: "Aqua Clean Solutions",
    logo: "/aqua-clean.jpg",
    title: "Limpeza de Rios",
    description:
      "Tecnologia avançada para remoção de resíduos e despoluição de cursos d'água.",
    reviews: 89,
    since: 2018,
    ods: [6, 14],
    fullDescription:
      "A Aqua Clean Solutions desenvolveu metodologias inovadoras para limpeza de rios urbanos e naturais, combinando tecnologia de ponta com processos ecológicos para remoção eficiente de poluentes sem danificar o ecossistema aquático.",
    benefits: [
      "Remoção de resíduos sólidos",
      "Processo de despoluição ecológico",
      "Monitoramento mensal",
      "Relatórios de qualidade da água",
      "Educação ambiental para comunidades",
    ],
    projects: [
      { name: "Despoluição Rio Tietê", location: "SP", length: "12km" },
      { name: "Limpeza Rio Doce", location: "MG/ES", length: "8km" },
      { name: "Projeto Águas Limpas", location: "PR", length: "5km" },
    ],
    pricing: [
      {
        option: "Limpeza Básica",
        price: "R$ 12.000",
        details: "Até 3km de extensão",
      },
      {
        option: "Limpeza Completa",
        price: "R$ 25.000",
        details: "3 a 8km de extensão",
      },
      {
        option: "Projeto Personalizado",
        price: "Sob consulta",
        details: "Acima de 8km",
      },
    ],
  },
  "limpeza-praias": {
    company: "Oceano Vivo",
    logo: "/oceano-vivo.jpg",
    title: "Limpeza de Praias e Mares",
    description:
      "Ações de coleta de lixo marinho com equipes especializadas e equipamentos de última geração.",
    reviews: 156,
    since: 2017,
    ods: [6, 14, 12],
    fullDescription:
      "A Oceano Vivo realiza operações de limpeza em praias e áreas costeiras, com tecnologia para remoção de microplásticos e resíduos sólidos. Nossas equipes trabalham em parceria com comunidades locais e órgãos ambientais.",
    benefits: [
      "Remoção de macro e micro resíduos",
      "Equipamentos especializados",
      "Relatórios mensais",
      "Programas de conscientização",
      "Certificado de limpeza",
    ],
    projects: [
      { name: "Projeto Praia Limpa", location: "BA", area: "5km de costa" },
      { name: "Operação Mar sem Lixo", location: "SC", area: "8km de costa" },
      { name: "Baía Sustentável", location: "RJ", area: "3km de costa" },
    ],
    pricing: [
      {
        option: "Ação Mensal",
        price: "R$ 18.000",
        details: "Manutenção regular",
      },
      {
        option: "Ação Trimestral",
        price: "R$ 45.000",
        details: "Pacote econômico",
      },
      {
        option: "Limpeza Emergencial",
        price: "Sob consulta",
        details: "Para desastres ambientais",
      },
    ],
  },
  "educacao-treinamento": {
    company: "Eco Educa Brasil",
    logo: "/eco-educa.jpg",
    title: "Educação e Treinamento",
    description:
      "Programas de capacitação em sustentabilidade para comunidades carentes e escolas públicas.",
    reviews: 72,
    since: 2019,
    ods: [4, 5, 10],
    fullDescription:
      "A Eco Educa Brasil desenvolve programas educacionais voltados para sustentabilidade ambiental, capacitando comunidades e instituições de ensino com metodologias práticas e inclusivas.",
    benefits: [
      "Material didático exclusivo",
      "Professores especializados",
      "Certificação reconhecida",
      "Acompanhamento pós-curso",
      "Kits de sustentabilidade",
    ],
    projects: [
      { name: "Escolas Sustentáveis", location: "SP", students: 2500 },
      { name: "Comunidade Eco", location: "CE", students: 1800 },
      { name: "Projeto Reciclar", location: "RS", students: 3200 },
    ],
    pricing: [
      {
        option: "Workshop Básico",
        price: "R$ 5.000",
        details: "4 horas de capacitação",
      },
      {
        option: "Curso Completo",
        price: "R$ 15.000",
        details: "20 horas de capacitação",
      },
      {
        option: "Programa Anual",
        price: "R$ 50.000",
        details: "Capacitação contínua",
      },
    ],
  },
  "energia-sustentavel": {
    company: "Solar Power BR",
    logo: "/solar-power.jpg",
    title: "Geração de Energia Sustentável",
    description:
      "Instalação de sistemas de energia renovável acessíveis para comunidades de baixa renda.",
    reviews: 98,
    since: 2016,
    ods: [7, 8, 11],
    fullDescription:
      "A Solar Power BR democratiza o acesso à energia limpa através de soluções personalizadas e financiamento acessível, levando tecnologia solar para comunidades carentes e pequenos negócios.",
    benefits: [
      "Projetos personalizados",
      "Financiamento facilitado",
      "Manutenção garantida",
      "Monitoramento remoto",
      "Redução de até 90% na conta de luz",
    ],
    projects: [
      { name: "Luz para Todos", location: "MG", systems: 450 },
      { name: "Solar Comunitário", location: "PE", systems: 320 },
      { name: "Negócios Sustentáveis", location: "GO", systems: 280 },
    ],
    pricing: [
      { option: "Sistema Básico", price: "R$ 8.000", details: "Até 2kWp" },
      {
        option: "Sistema Residencial",
        price: "R$ 18.000",
        details: "2 a 5kWp",
      },
      {
        option: "Sistema Comercial",
        price: "Sob consulta",
        details: "Acima de 5kWp",
      },
    ],
  },
};

export default function ServiceDetails({
  params,
}: {
  params: Promise<{ serviceId: string }>;
}) {
  const router = useRouter();
  const resolvedParams = React.use(params); // Desempacota a Promise
  const service =
    companyData[resolvedParams.serviceId as keyof typeof companyData];

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Serviço não encontrado</h1>
          <button
            onClick={() => router.push("/services")}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Voltar para serviços
          </button>
        </div>
      </div>
    );
  }

  const renderProjectMetric = (project: Project) => {
    if (project.trees)
      return `${project.trees.toLocaleString()} árvores plantadas`;
    if (project.length) return `Extensão: ${project.length}`;
    if (project.students)
      return `${project.students.toLocaleString()} capacitados`;
    if (project.systems)
      return `${project.systems.toLocaleString()} sistemas instalados`;
    if (project.area) return `Área: ${project.area}`;
    return "";
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-gray-900 to-black px-4 sm:px-6 lg:px-8 min-w-[320px]">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Botão Voltar */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          onClick={() => router.back()}
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 transition-colors"
        >
          <FiArrowLeft /> Voltar para empresas
        </motion.button>

        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row gap-8 mb-12"
        >
          {/* Logo e Info Básica */}
          <div className="md:w-1/3">
            <div className="relative h-64 w-full rounded-2xl overflow-hidden mb-6">
              <Image
                src={service.logo}
                alt={service.company}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <h1 className="text-2xl font-bold mb-2">{service.company}</h1>
              <div className="space-y-3">
                <div className="flex items-center text-zinc-400">
                  <FiClock className="mr-2" />
                  <span>No mercado desde {service.since}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {service.ods.map((ods) => (
                    <span
                      key={ods}
                      className="px-3 py-1 bg-blue-900/20 text-xs rounded-full text-blue-300 border border-blue-800/50"
                    >
                      ODS {ods}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Contato */}
            <div className="rounded-2xl  mt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-r from-blue-900/50 to-indigo-900/50 border border-blue-800/30 rounded-2xl p-4 text-center"
              >
                <h3 className="text-2xl font-bold mb-6">Entrar em Contato</h3>
                <Link
                  href="/Chat"
                  className="relative z-10 inline-block px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors cursor-pointer"
                >
                  Solicitar Proposta via Chat
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Detalhes do Serviço */}
          <div className="md:w-2/3">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-3xl font-bold mb-4">{service.title}</h2>
              <p className="text-zinc-300 mb-6">{service.fullDescription}</p>

              {/* Benefícios */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <FiCheck className="text-green-400 mr-2" /> Benefícios do
                  Serviço
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {service.benefits.map((benefit, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-zinc-300"
                    >
                      <FiCheck className="text-green-400 mt-1 flex-shrink-0" />{" "}
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Projetos Realizados */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <FiMapPin className="text-blue-400 mr-2" /> Projetos
                  Realizados
                </h3>
                <div className="space-y-4">
                  {service.projects.map((project, index) => (
                    <div
                      key={index}
                      className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4"
                    >
                      <h4 className="font-bold">{project.name}</h4>
                      <div className="flex justify-between text-sm text-zinc-400 mt-2">
                        <span>Local: {project.location}</span>
                        <span>{renderProjectMetric(project)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
