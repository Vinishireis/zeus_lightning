// components/HelpSidebar.tsx
'use client'

import { FiHelpCircle, FiX, FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { useState, useEffect } from 'react'

interface HelpSidebarProps {
  currentSection: number
  currentQuestion?: number
}

const questionTips = [
  // Section 1: Visão Geral da Organização
  {
    title: "Visão Geral da Organização",
    questions: [
      {
        text: "Qual é o modelo de negócio da sua empresa (principais produtos, serviços, mercado e cadeia de valor)?",
        tips: [
          "Descreva claramente seus principais produtos/serviços",
          "Identifique os mercados geográficos e segmentos atendidos",
          "Explique sua cadeia de valor desde suprimentos até distribuição",
          "Mencione tamanho (receita, funcionários) e posicionamento competitivo"
        ]
      },
      {
        text: "Quais são os principais fatores do ambiente operacional que afetam sua estratégia?",
        tips: [
          "Liste regulamentações setoriais relevantes",
          "Descreva tendências tecnológicas e de mercado",
          "Analise concorrência e barreiras de entrada",
          "Mencione fatores macroeconômicos impactantes"
        ]
      },
      {
        text: "Quais são os pilares estratégicos da empresa relacionados à sustentabilidade?",
        tips: [
          "Conecte com os Objetivos de Desenvolvimento Sustentável (ODS) da ONU",
          "Mostre como a sustentabilidade cria valor para o negócio",
          "Destaque iniciativas principais e investimentos",
          "Relacione com riscos e oportunidades estratégicas"
        ]
      },
      {
        text: "Como é estruturado o relacionamento com stakeholders?",
        tips: [
          "Liste grupos-chave (clientes, investidores, comunidades)",
          "Descreva canais de comunicação e frequência",
          "Mencione processos de engajamento e feedback",
          "Mostre como as demandas são incorporadas na estratégia"
        ]
      }
    ]
  },
  // Section 2: Governança de Sustentabilidade e Clima
  {
    title: "Governança de Sustentabilidade e Clima",
    questions: [
      {
        text: "Existe um comitê de sustentabilidade ou equivalente?",
        tips: [
          "Descreva composição (executivos, especialistas, independentes)",
          "Liste frequência de reuniões e pautas típicas",
          "Detalhe responsabilidades e poderes decisórios",
          "Mostre como as decisões são implementadas"
        ]
      },
      {
        text: "Qual é o papel do Conselho de Administração na supervisão de questões ESG?",
        tips: [
          "Descreva a expertise em ESG dos conselheiros",
          "Liste comitês relevantes (riscos, auditoria, sustentabilidade)",
          "Mencione frequência de discussões sobre ESG",
          "Mostre como supervisionam metas e desempenho"
        ]
      },
      {
        text: "Há definição de responsabilidades específicas para riscos climáticos?",
        tips: [
          "Identifique cargos/funções com responsabilidades climáticas",
          "Descreva mecanismos de reporte e accountability",
          "Mencione integração com gestão de riscos corporativos",
          "Mostre links com remuneração variável quando aplicável"
        ]
      }
    ]
  },
  // Continue with all other sections...
  // Section 8: Anexos e Complementos
  {
    title: "Anexos e Complementos",
    questions: [
      {
        text: "Deseja incluir um índice cruzado com normas como GRI, SASB ou TCFD?",
        tips: [
          "Indique quais frameworks serão mapeados",
          "Mostre como os indicadores se relacionam",
          "Destaque complementaridades entre os frameworks",
          "Mencione se há relatórios setoriais específicos"
        ]
      },
      {
        text: "Quais fontes metodológicas são utilizadas para as métricas?",
        tips: [
          "Liste protocolos de cálculo (GHG Protocol para emissões)",
          "Mencione bases de dados setoriais utilizadas",
          "Descreva processos de coleta e verificação de dados",
          "Mostre como garantem consistência metodológica"
        ]
      },
      {
        text: "Deseja incluir um glossário com termos técnicos?",
        tips: [
          "Selecione termos que possam ser ambíguos ou setoriais",
          "Defina métricas específicas da empresa",
          "Inclua acrônimos e terminologia técnica",
          "Mantenha linguagem clara e acessível"
        ]
      }
    ]
  }
]

export function HelpSidebar({ currentSection, currentQuestion }: HelpSidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedTips, setExpandedTips] = useState<boolean[]>([])

  // Initialize and update when section changes
  useEffect(() => {
    const tipsCount = questionTips[currentSection]?.questions.length || 0
    setExpandedTips(new Array(tipsCount).fill(false))
    
    // Auto-close on mobile when section changes
    if (window.innerWidth < 768) {
      setIsOpen(false)
    }
  }, [currentSection])

  const toggleTip = (index: number) => {
    const newExpandedTips = [...expandedTips]
    newExpandedTips[index] = !newExpandedTips[index]
    setExpandedTips(newExpandedTips)
  }

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-4 bottom-4 z-40 p-3 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full shadow-lg hover:shadow-xl transition-all md:hidden"
        aria-label={isOpen ? "Fechar ajuda" : "Abrir ajuda"}
      >
        {isOpen ? (
          <FiX className="text-white text-xl" />
        ) : (
          <FiHelpCircle className="text-white text-xl" />
        )}
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/70 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 right-0 h-full w-full max-w-md bg-zinc-900/95 backdrop-blur-lg border-l border-emerald-500/20
        z-40 transform transition-transform duration-300 ease-in-out shadow-xl
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        md:sticky md:top-4 md:h-[calc(100vh-2rem)] md:translate-x-0 md:bg-zinc-900/50 md:border-none md:shadow-none
      `}>
        <div className="h-full flex flex-col p-4 overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
              <FiHelpCircle />
              {questionTips[currentSection]?.title}
            </h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="md:hidden text-gray-400 hover:text-white"
              aria-label="Fechar sidebar"
            >
              <FiX size={20} />
            </button>
          </div>

          {/* Questions help */}
          <div className="space-y-3 flex-1">
            {questionTips[currentSection]?.questions.map((question, index) => (
              <div 
                key={index}
                className={`bg-zinc-800/50 rounded-lg p-3 border transition-all
                  ${currentQuestion === index ? 'border-emerald-500/50' : 'border-white/10'}
                `}
              >
                <button
                  className="w-full flex justify-between items-center gap-2"
                  onClick={() => toggleTip(index)}
                  aria-expanded={expandedTips[index]}
                >
                  <span className="text-sm font-medium text-white text-left">
                    {index + 1}. {question.text.substring(0, 50)}{question.text.length > 50 ? "..." : ""}
                  </span>
                  {expandedTips[index] ? (
                    <FiChevronUp className="text-emerald-400 flex-shrink-0" />
                  ) : (
                    <FiChevronDown className="text-gray-400 flex-shrink-0" />
                  )}
                </button>
                
                {expandedTips[index] && (
                  <div className="mt-2 pl-2 space-y-2 text-sm text-gray-300 animate-fade-in">
                    {question.tips.map((tip, tipIndex) => (
                      <p key={tipIndex} className="border-l-2 border-emerald-500/50 pl-2 py-1">
                        {tip}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </aside>
    </>
  )
}