'use client'

import { Button } from "@/components/ui/button"
import { useState, useCallback } from "react"
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'
import { ESGReportPDF } from '../../components/ESGReportPDF'
import { useStore } from '@/lib/store'
import { FiUpload, FiX, FiFile } from 'react-icons/fi'
import { useDropzone } from 'react-dropzone'


const esgSections = [
  {
    title: "Visão Geral da Organização",
    questions: [
      "Qual é o modelo de negócio da sua empresa (principais produtos, serviços, mercado e cadeia de valor)?",
      "Quais são os principais fatores do ambiente operacional que afetam sua estratégia (ex.: regulação, concorrência, tendências)?",
      "Quais são os pilares estratégicos da empresa relacionados à sustentabilidade?",
      "Como é estruturado o relacionamento com stakeholders? Liste os grupos-chave e seus canais de interação."
    ]
  },
  {
    title: "Governança de Sustentabilidade e Clima",
    questions: [
      "Existe um comitê de sustentabilidade ou equivalente? Descreva sua composição e atribuições.",
      "Qual é o papel do Conselho de Administração e da Diretoria na supervisão de questões ESG e climáticas?",
      "Há definição de responsabilidades específicas para riscos climáticos e ESG dentro da organização?"
    ]
  },
  {
    title: "Estratégia e Gestão de Riscos e Oportunidades",
    questions: [
      "Quais riscos climáticos físicos e de transição foram identificados como relevantes para a empresa?",
      "Quais oportunidades relacionadas à sustentabilidade e clima foram identificadas?",
      "Como esses riscos e oportunidades impactam a estratégia, o modelo de negócio e a performance?",
      "A empresa utiliza análise de cenários climáticos (ex.: +1,5°C, +2°C)? Descreva os principais resultados e aprendizados."
    ]
  },
  {
    title: "Gestão e Monitoramento",
    questions: [
      "Quais processos são utilizados para identificar e avaliar riscos ESG e climáticos?",
      "Como esses riscos são integrados à matriz de riscos corporativos?",
      "Existe algum sistema ou ferramenta de monitoramento e controle dos riscos ESG?"
    ]
  },
  {
    title: "Métricas e Indicadores",
    questions: [
      "Quais metas ESG e climáticas foram definidas pela empresa? (curto, médio e longo prazo)",
      "A empresa monitora emissões de GEE? Se sim, indique os dados mais recentes de Escopo 1, 2 e 3.",
      "Há plano de descarbonização ou transição energética em andamento? Detalhe os principais marcos.",
      "Quais outros indicadores ESG (ex.: diversidade, consumo de água, gestão de resíduos) são monitorados?",
      "A empresa utiliza frameworks como SASB ou GRI para seus indicadores? Especifique quais e como são aplicados."
    ]
  },
  {
    title: "Conectividade com Informações Financeiras",
    questions: [
      "Como os riscos ESG e climáticos impactam os resultados financeiros (ativos, passivos, receita, despesas)?",
      "Há efeitos sobre o fluxo de caixa ou o custo de capital da empresa relacionados à sustentabilidade?",
      "A empresa considera esses impactos nas projeções e orçamentos?"
    ]
  },
  {
    title: "Base para Preparação e Apresentação",
    questions: [
      "Qual é a periodicidade planejada para a publicação do relatório ESG?",
      "Quais princípios de materialidade e julgamento são aplicados na definição dos conteúdos?",
      "A empresa declara conformidade com as normas IFRS S1 e S2? Há alguma limitação ou ressalva?"
    ]
  },
  {
    title: "Anexos e Complementos",
    questions: [
      "Deseja incluir um índice cruzado com normas como GRI, SASB ou TCFD?",
      "Quais fontes metodológicas ou bases de dados são utilizadas para as métricas e indicadores?",
      "Deseja incluir um glossário com termos técnicos ou específicos do seu setor?"
    ]
  }
]

const reportGuidelines = `Sua função será gerar Relatórios de ESG completo e personalizado para empresas de diferentes setores, com alto padrão de apresentação e profundidade analítica. O relatório deve ter linguagem clara, objetiva e voltada para CEOs, investidores e instituições financeiras. Diretrizes obrigatórias: 1. A estrutura do relatório deve seguir integralmente as normas IFRS S1 (divulgação de sustentabilidade) e IFRS S2 (divulgação de riscos climáticos). 2. Normas complementares podem ser utilizadas apenas quando os temas não forem contemplados por IFRS S1/S2, desde que não entrem em conflito. As normas complementares autorizadas são: • GRI (Global Reporting Initiative) • Integrated Reporting (IIRC) • SASB (Sustainability Accounting Standards Board) • TCFD (Task Force on Climate-related Financial Disclosures) Estrutura do Relatório: Utilize os seguintes capítulos e subtópicos, com base nas normas citadas: 1. Visão Geral da Organização • Modelo de negócio, ambiente operacional e estratégia (IFRS S1) • Governança e controle interno sobre sustentabilidade (IFRS S1/S2) • Relacionamento com stakeholders (GRI/IIRC) 2. Governança de Sustentabilidade e Clima • Comitês, competências e papéis decisórios (IFRS S1/S2) • Supervisão de riscos e oportunidades climáticas (TCFD) 3. Estratégia e Gestão de Riscos e Oportunidades • Identificação de riscos ESG e climáticos (IFRS S1/S2) • Integração ao plano de negócios e uso de cenários (IFRS S2/TCFD) 4. Gestão e Monitoramento • Processos de identificação, avaliação e resposta a riscos ESG • Integração com a gestão de riscos corporativos (IFRS S1/S2, TCFD) 5. Métricas e Indicadores • Metas e indicadores ESG e climáticos (IFRS S1/S2, SASB, GRI) • Emissões GEE (escopos 1, 2 e 3), metas de descarbonização e planos de transição 6. Conectividade com Informações Financeiras • Efeitos financeiros dos riscos ESG (IFRS S1/S2, TCFD) • Impactos em ativos, passivos, fluxo de caixa e acesso a capital 7. Base para Preparação e Apresentação • Periodicidade do relatório, princípios de materialidade, premissas e julgamentos • Declaração de conformidade com as normas IFRS S1 e S2 8. Anexos e Complementos • Índice de conteúdo cruzado com GRI, SASB e outras normas • Glossário de termos, fontes metodológicas e referências. Dados de entrada: A IA receberá as informações por meio de um questionário padrão (com 32 questões), estruturado em 9 seções, que abrangem desde visão organizacional até aspectos gráficos e visuais do relatório. Essas respostas serão utilizadas como base para gerar conteúdo exclusivo, preciso e alinhado às normas internacionais.`

export default function ESGFormPage() {
  const router = useRouter()
  const [currentSection, setCurrentSection] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [apiResponse, setApiResponse] = useState("")
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const { setApiResponse: setStoreResponse } = useStore()

  const handleAnswerChange = (questionIndex: number, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [`${currentSection}-${questionIndex}`]: value
    }))
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploadedFiles(acceptedFiles)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
      'text/plain': ['.txt']
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: true
  })

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const generateReport = (): string => {
    let reportContent = reportGuidelines
    
    esgSections.forEach((section, sectionIndex) => {
      reportContent += `\n${sectionIndex + 1}. ${section.title}\n`
      
      section.questions.forEach((question, questionIndex) => {
        const answerKey = `${sectionIndex}-${questionIndex}`
        reportContent += `  ${sectionIndex + 1}.${questionIndex + 1} ${question}\n`
        reportContent += `    Resposta: ${answers[answerKey] || "Não respondido"}\n\n`
      })
    })

    // Add information about uploaded files
    if (uploadedFiles.length > 0) {
      reportContent += `\nArquivos Anexados:\n`
      uploadedFiles.forEach((file, index) => {
        reportContent += `  ${index + 1}. ${file.name} (${(file.size / 1024).toFixed(2)} KB)\n`
      })
    }

    return reportContent
  }

  const handleSubmit = async () => {
    if (isSubmitting) return
    
    // Validate all questions are answered
    for (let sectionIndex = 0; sectionIndex < esgSections.length; sectionIndex++) {
      for (let questionIndex = 0; questionIndex < esgSections[sectionIndex].questions.length; questionIndex++) {
        const answerKey = `${sectionIndex}-${questionIndex}`
        if (!answers[answerKey]?.trim()) {
          alert(`Por favor, responda a pergunta ${sectionIndex + 1}.${questionIndex + 1} na seção "${esgSections[sectionIndex].title}"`)
          setCurrentSection(sectionIndex)
          return
        }
      }
    }
    
    setIsSubmitting(true)
    
    try {
      const report = generateReport()
      
      if (uploadedFiles.length > 0) {
        const formData = new FormData()
        formData.append('fullReport', report)
        uploadedFiles.forEach(file => {
          formData.append('files', file)
        })

        const response = await axios.post('/api/Chat', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        })
        
        if (response.data?.relatorioCompleto) {
          setApiResponse(response.data.relatorioCompleto)
          setStoreResponse(response.data.relatorioCompleto)
          router.push('/Chat')
        } else {
          throw new Error("Resposta da API mal formatada")
        }
      } else {
        const response = await axios.post('/api/chat', { fullReport: report }, {
          headers: {
            'Content-Type': 'application/json',
          }
        })
        if (response.data?.relatorioCompleto) {
          setApiResponse(response.data.relatorioCompleto)
          setStoreResponse(response.data.relatorioCompleto)
          router.push('/Chat')
        } else {
          throw new Error("Resposta da API mal formatada")
        }
      }
    } catch (error) {
      console.error("Erro ao gerar relatório:", error)
      
      let errorMessage = "Ocorreu um erro ao gerar o relatório."
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage
      }
      
      alert(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextSection = () => {
    // Validate current section questions before proceeding
    const currentQuestions = esgSections[currentSection].questions
    for (let i = 0; i < currentQuestions.length; i++) {
      const answerKey = `${currentSection}-${i}`
      if (!answers[answerKey]?.trim()) {
        alert(`Por favor, responda a pergunta ${currentSection + 1}.${i + 1} antes de prosseguir`)
        return
      }
    }

    if (currentSection < esgSections.length - 1) {
      setCurrentSection(prev => prev + 1)
    }
  }

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(prev => prev - 1)
    }
  }

  const isLastSection = currentSection === esgSections.length - 1

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-black p-4">
      <div className="w-full max-w-4xl z-10">
        {/* Header Section */}
        <div className="text-center mb-8">
          <span className="inline-block py-1.5 px-4 bg-gradient-to-r from-blue-900/40 to-emerald-900/40 backdrop-blur-md rounded-full text-white text-sm md:text-base border border-white/10 tracking-wide mb-4">
            FORMULÁRIO ESG COMPLETO
          </span>
          
          <div className="space-y-2">
            <h1 className="text-4xl md:text-6xl tracking-tighter bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-cyan-400 text-transparent font-bold leading-tight">
              Zeus ESG
            </h1>
            <h2 className="text-3xl md:text-5xl tracking-tighter bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-500 text-transparent font-bold leading-tight">
              Lightning Form
            </h2>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white/5 p-6 sm:p-8 rounded-xl border border-white/10 backdrop-blur-lg">
          {/* Section Header */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 text-transparent mb-3">
              {currentSection + 1}. {esgSections[currentSection].title}
            </h3>
            
            {/* Progress Bar */}
            <div className="bg-white/5 p-2 rounded-lg border border-white/10 flex items-center mb-6">
              <div className="w-full bg-white/10 rounded-full h-2.5">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-emerald-500 h-2.5 rounded-full transition-all duration-500" 
                  style={{width: `${((currentSection + 1) / esgSections.length) * 100}%`}}
                ></div>
              </div>
              <span className="ml-3 text-sm text-gray-300">
                {Math.round(((currentSection + 1) / esgSections.length) * 100)}% completado
              </span>
            </div>

            {/* Questions */}
            <div className="space-y-6">
              {esgSections[currentSection].questions.map((question, index) => (
                <div key={index} className="animate-fade-in">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {currentSection + 1}.{index + 1} {question} *
                  </label>
                  <textarea
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all duration-300 placeholder-gray-400"
                    rows={4}
                    value={answers[`${currentSection}-${index}`] || ""}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                    placeholder="Digite sua resposta aqui..."
                    required
                  />
                </div>
              ))}

              {/* File Upload Section (only on last section) */}
              {isLastSection && (
                <div className="animate-fade-in mt-8">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Deseja incluir documentos complementares? (Opcional)
                  </label>
                  
                  <div 
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                      isDragActive ? 'border-blue-500 bg-blue-900/10' : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <input {...getInputProps()} />
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <FiUpload className="h-8 w-8 text-gray-400" />
                      <p className="text-sm text-gray-400">
                        {isDragActive ? 
                          'Solte os arquivos aqui' : 
                          'Arraste e solte arquivos aqui, ou clique para selecionar'}
                      </p>
                      <p className="text-xs text-gray-500">
                        Formatos suportados: PDF, DOC, XLS, JPG, PNG (até 10MB cada)
                      </p>
                    </div>
                  </div>

                  {/* Uploaded files list */}
                  {uploadedFiles.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <h4 className="text-sm font-medium text-gray-300">Arquivos selecionados:</h4>
                      <ul className="space-y-2">
                        {uploadedFiles.map((file, index) => (
                          <li key={index} className="flex items-center justify-between bg-white/5 p-3 rounded-lg">
                            <div className="flex items-center space-x-2">
                              <FiFile className="h-5 w-5 text-gray-400" />
                              <div>
                                <p className="text-sm font-medium text-white truncate max-w-xs">
                                  {file.name}
                                </p>
                                <p className="text-xs text-gray-400">
                                  {(file.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={() => removeFile(index)}
                              className="text-red-400 hover:text-red-300 transition-colors duration-200"
                            >
                              <FiX className="h-5 w-5" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-4 border-t border-white/10">
              <Button
                variant="secondary"
                size="lg"
                className="rounded-full px-6 border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-lg transition-all duration-300"
                onClick={prevSection}
                disabled={currentSection === 0}
              >
                Voltar
              </Button>
              
              {currentSection < esgSections.length - 1 ? (
                <Button
                  size="lg"
                  className="rounded-full px-6 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg shadow-blue-500/20"
                  onClick={nextSection}
                >
                  Próxima Seção
                </Button>
              ) : (
                <Button
                  size="lg"
                  className="rounded-full px-6 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 transition-all duration-300 shadow-lg shadow-emerald-500/20"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enviando...
                    </span>
                  ) : "Enviar Formulário"}
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Report Preview Section */}
        {apiResponse && (
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-lg mt-6 animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 text-transparent">
                Pré-visualização do Relatório
              </h3>
              <PDFDownloadLink 
                document={<ESGReportPDF answers={answers} esgSections={esgSections} />}
                fileName="relatorio_esg.pdf"
              >
                {({ loading }) => (
                  <Button
                    variant="outline"
                    className="bg-emerald-600/90 hover:bg-emerald-700/90 text-white border-emerald-700"
                    disabled={loading}
                  >
                    {loading ? 'Gerando PDF...' : 'Download PDF'}
                  </Button>
                )}
              </PDFDownloadLink>
            </div>

            <div className="h-[500px] border border-white/10 rounded-lg overflow-hidden bg-white">
              <PDFViewer width="100%" height="100%" className="min-h-[500px]">
                <ESGReportPDF answers={answers} esgSections={esgSections} />
              </PDFViewer>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}