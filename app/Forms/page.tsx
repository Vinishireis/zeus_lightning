"use client";

import { Button } from "@/components/ui/button";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { ESGReportPDF } from "../../components/ESGReportPDF";
import { useStore } from "@/lib/store";
import { FiUpload, FiX, FiHelpCircle } from "react-icons/fi";
import { useDropzone } from "react-dropzone";

const esgSections = [
  {
    title: "Visão Geral da Organização",
    questions: [
      "Qual é o modelo de negócio da sua empresa (principais produtos, serviços, mercado e cadeia de valor)?",
      "Quais são os principais fatores do ambiente operacional que afetam sua estratégia (ex.: regulação, concorrência, tendências)?",
      "Quais são os pilares estratégicos da empresa relacionados à sustentabilidade?",
      "Como é estruturado o relacionamento com stakeholders? Liste os grupos-chave e seus canais de interação.",
    ],
    hints: [
      "Descreva de forma concisa os principais elementos do seu negócio: setor de atuação, produtos/serviços principais, mercados atendidos e como cria valor. Inclua dados como faturamento, número de funcionários e localizações estratégicas.",
      "Mencione fatores externos relevantes como mudanças regulatórias, pressões competitivas, evolução tecnológica e expectativas dos consumidores. Destaque como estes fatores influenciam suas decisões estratégicas.",
      "Liste 3-5 prioridades estratégicas em sustentabilidade (ex.: redução de emissões, diversidade, economia circular). Explique como se conectam com a estratégia geral do negócio.",
      "Identifique os 5-7 grupos de stakeholders mais relevantes (clientes, investidores, comunidades, etc.) e descreva os mecanismos de engajamento com cada um (pesquisas, comitês, canais de denúncia, etc.)."
    ]
  },
  {
    title: "Governança de Sustentabilidade e Clima",
    questions: [
      "Existe um comitê de sustentabilidade ou equivalente? Descreva sua composição e atribuições.",
      "Qual é o papel do Conselho de Administração e da Diretoria na supervisão de questões ESG e climáticas?",
      "Há definição de responsabilidades específicas para riscos climáticos e ESG dentro da organização?",
    ],
    hints: [
      "Caso exista, detalhe a estrutura (número de membros, cargos representados, frequência de reuniões) e principais responsabilidades (definição de metas, revisão de desempenho, aprovação de políticas). Se não existir, explique como essas funções são distribuídas.",
      "Descreva como o tema é tratado nas reuniões (frequência na pauta, comitês específicos, indicadores monitorados). Mencione se há membros com expertise em sustentabilidade no Conselho.",
      "Especifique áreas/departamentos responsáveis por monitorar diferentes aspectos (ex.: RH para diversidade, Operações para emissões, Jurídico para compliance). Inclua cargos executivos com metas vinculadas a ESG."
    ]
  },
  {
    title: "Estratégia e Gestão de Riscos e Oportunidades",
    questions: [
      "Quais riscos climáticos físicos e de transição foram identificados como relevantes para a empresa?",
      "Quais oportunidades relacionadas à sustentabilidade e clima foram identificadas?",
      "Como esses riscos e oportunidades impactam a estratégia, o modelo de negócio e a performance?",
      "A empresa utiliza análise de cenários climáticos (ex.: +1,5°C, +2°C)? Descreva os principais resultados e aprendizados.",
    ],
    hints: [
      "Para riscos físicos: eventos extremos, mudanças de padrões climáticos. Para transição: mudanças regulatórias, tecnologias disruptivas, preferências do consumidor. Classifique por probabilidade e impacto.",
      "Exemplos: eficiência operacional, novos produtos/serviços sustentáveis, acesso a financiamento verde, vantagem competitiva. Priorize as 3-5 mais relevantes.",
      "Analise impactos em: cadeia de suprimentos, demanda por produtos, custos operacionais, requisitos de capital, reputação. Use exemplos concretos quando possível.",
      "Descreva a metodologia utilizada (ex.: TCFD), horizontes temporais considerados e principais conclusões sobre resiliência do negócio em diferentes cenários."
    ]
  },
  {
    title: "Gestão e Monitoramento",
    questions: [
      "Quais processos são utilizados para identificar e avaliar riscos ESG e climáticos?",
      "Como esses riscos são integrados à matriz de riscos corporativos?",
      "Existe algum sistema ou ferramenta de monitoramento e controle dos riscos ESG?",
    ],
    hints: [
      "Descreva as metodologias (análise SWOT, workshops com especialistas, benchmark setorial), frequência de revisão e critérios de avaliação (impacto financeiro, probabilidade, horizonte temporal).",
      "Explique como são classificados (baixo/médio/alto risco) e vinculados aos riscos tradicionais (operacionais, estratégicos, financeiros). Inclua exemplos de riscos que já foram materializados.",
      "Liste sistemas utilizados (ERP, softwares específicos de ESG), indicadores monitorados em dashboards e frequência de reporting. Mencione se há integração com sistemas financeiros."
    ]
  },
  {
    title: "Métricas e Indicadores",
    questions: [
      "Quais metas ESG e climáticas foram definidas pela empresa? (curto, médio e longo prazo)",
      "A empresa monitora emissões de GEE? Se sim, indique os dados mais recentes de Escopo 1, 2 e 3.",
      "Há plano de descarbonização ou transição energética em andamento? Detalhe os principais marcos.",
      "Quais outros indicadores ESG (ex.: diversidade, consumo de água, gestão de resíduos) são monitorados?",
      "A empresa utiliza frameworks como SASB ou GRI para seus indicadores? Especifique quais e como são aplicados.",
    ],
    hints: [
      "Siga o modelo SMART (específicas, mensuráveis, alcançáveis, relevantes, temporais). Exemplo: 'Reduzir emissões Escopo 1 e 2 em 30% até 2030 (base 2020)'.",
      "Informe metodologia de cálculo (GHG Protocol), períodos reportados e limites organizacionais. Para Escopo 3, liste categorias relevantes incluídas (ex.: viagens, cadeia de suprimentos).",
      "Descreva iniciativas como eficiência energética, migração para renováveis, projetos de compensação. Inclua prazos, investimentos previstos e % de redução esperada em cada fase.",
      "Priorize os 5-10 mais relevantes para seu setor. Exemplos: % mulheres em liderança, taxa de reciclagem, horas de treinamento em ESG, acidentes de trabalho.",
      "Explique quais padrões são adotados (total ou parcialmente), como são selecionados os indicadores e se há verificação externa. Mencione planos de aderir a novos frameworks."
    ]
  },
  {
    title: "Conectividade com Informações Financeiras",
    questions: [
      "Como os riscos ESG e climáticos impactam os resultados financeiros (ativos, passivos, receita, despesas)?",
      "Há efeitos sobre o fluxo de caixa ou o custo de capital da empresa relacionados à sustentabilidade?",
      "A empresa considera esses impactos nas projeções e orçamentos?",
    ],
    hints: [
      "Analise: desvalorização de ativos físicos, aumento de custos de compliance, mudanças na demanda por produtos. Quantifique quando possível (ex.: 'Investimento de R$X em adaptação esperado nos próximos 5 anos').",
      "Mencione acesso a linhas de crédito sustentáveis (taxas diferenciadas), exigências de investidores, custos de seguro. Destaque se há precificação interna de carbono.",
      "Descreva processos de alocação de recursos para iniciativas ESG, ajustes em projeções de receita/custo e se há orçamento dedicado. Inclua exemplos de decisões recentes influenciadas por esses fatores."
    ]
  },
  {
    title: "Base para Preparação e Apresentação",
    questions: [
      "Qual é a periodicidade planejada para a publicação do relatório ESG?",
      "Quais princípios de materialidade e julgamento são aplicados na definição dos conteúdos?",
      "A empresa declara conformidade com as normas IFRS S1 e S2? Há alguma limitação ou ressalva?",
    ],
    hints: [
      "Indique se será anual/bienal e se seguirá o ciclo do relatório financeiro. Mencione planos de evolução (ex.: relatórios trimestrais de indicadores-chave).",
      "Explique o processo de engajamento com stakeholders para definir temas materiais e os critérios de priorização (impacto financeiro, expectativas de investidores, relevância setorial).",
      "Especifique o nível de adoção (parcial/total), itens atendidos e não atendidos, e plano para alcançar conformidade total. Inclua limitações nos dados ou metodologias."
    ]
  },
  {
    title: "Anexos e Complementos",
    questions: [
      "Deseja incluir um índice cruzado com normas como GRI, SASB ou TCFD?",
      "Quais fontes metodológicas ou bases de dados são utilizadas para as métricas e indicadores?",
      "Deseja incluir um glossário com termos técnicos ou específicos do seu setor?",
    ],
    hints: [
      "Recomendado para demonstrar alinhamento com múltiplos frameworks. Indique quais padrões serão mapeados e o nível de detalhe (indicadores principais ou completos).",
      "Liste referências como IPCC para cálculo de emissões, OIT para métricas sociais, bancos de dados setoriais. Inclua ferramentas/softwares utilizados para coleta e análise.",
      "Particularmente útil para termos técnicos do setor, siglas e conceitos específicos de sustentabilidade. Mantenha definições concisas (1-2 frases) e organize em ordem alfabética."
    ]
  },
];

const reportGuidelines = `Sua função será gerar Relatórios de ESG completo e personalizado para empresas de diferentes setores, com alto padrão de apresentação e profundidade analítica. O relatório deve ter linguagem clara, objetiva e voltada para CEOs, investidores e instituições financeiras. Diretrizes obrigatórias: 1. A estrutura do relatório deve seguir integralmente as normas IFRS S1 (divulgação de sustentabilidade) e IFRS S2 (divulgação de riscos climáticos). 2. Normas complementares podem ser utilizadas apenas quando os temas não forem contemplados por IFRS S1/S2, desde que não entrem em conflito. As normas complementares autorizadas são: • GRI (Global Reporting Initiative) • Integrated Reporting (IIRC) • SASB (Sustainability Accounting Standards Board) • TCFD (Task Force on Climate-related Financial Disclosures) Estrutura do Relatório: Utilize os seguintes capítulos e subtópicos, com base nas normas citadas: 1. Visão Geral da Organização • Modelo de negócio, ambiente operacional e estratégia (IFRS S1) • Governança e controle interno sobre sustentabilidade (IFRS S1/S2) • Relacionamento com stakeholders (GRI/IIRC) 2. Governança de Sustentabilidade e Clima • Comitês, competências e papéis decisórios (IFRS S1/S2) • Supervisão de riscos e oportunidades climáticas (TCFD) 3. Estratégia e Gestão de Riscos e Oportunidades • Identificação de riscos ESG e climáticos (IFRS S1/S2) • Integração ao plano de negócios e uso de cenários (IFRS S2/TCFD) 4. Gestão e Monitoramento • Processos de identificação, avaliação e resposta a riscos ESG • Integração com a gestão de riscos corporativos (IFRS S1/S2, TCFD) 5. Métricas e Indicadores • Metas e indicadores ESG e climáticos (IFRS S1/S2, SASB, GRI) • Emissões GEE (escopos 1, 2 e 3), metas de descarbonização e planos de transição 6. Conectividade com Informações Financeiras • Efeitos financeiros dos riscos ESG (IFRS S1/S2, TCFD) • Impactos em ativos, passivos, fluxo de caixa e acesso a capital 7. Base para Preparação e Apresentação • Periodicidade do relatório, princípios de materialidade, premissas e julgamentos • Declaração de conformidade com as normas IFRS S1 e S2 8. Anexos e Complementos • Índice de conteúdo cruzado com GRI, SASB e outras normas • Glossário de termos, fontes metodológicas e referências. Dados de entrada: A IA receberá as informações por meio de um questionário padrão (com 32 questões), estruturado em 9 seções, que abrangem desde visão organizacional até aspectos gráficos e visuais do relatório. Essas respostas serão utilizadas como base para gerar conteúdo exclusivo, preciso e alinhado às normas internacionais.`;

export default function ESGFormPage() {
  const router = useRouter();
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiResponse, setApiResponse] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const { setApiResponse: setStoreResponse, setEsgData } = useStore();
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number | null>(null);

  // Atualiza resposta de uma pergunta
  const handleAnswerChange = (questionIndex: number, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [`${currentSection}-${questionIndex}`]: value,
    }));
  };

  // Upload via react-dropzone
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploadedFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "application/vnd.ms-excel": [".xls"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
      "text/plain": [".txt"],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: true,
  });

  // Remove arquivo da lista
  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Gera o relatório baseado nas respostas
  const generateReport = (): string => {
    let reportContent = reportGuidelines + "\n";

    esgSections.forEach((section, sectionIndex) => {
      reportContent += `\n${sectionIndex + 1}. ${section.title}\n`;

      section.questions.forEach((question, questionIndex) => {
        const answerKey = `${sectionIndex}-${questionIndex}`;
        reportContent += `  ${sectionIndex + 1}.${questionIndex + 1} ${question}\n`;
        reportContent += `    Resposta: ${answers[answerKey] || "Não respondido"}\n\n`;
      });
    });

    return reportContent;
  };

  // Valida respostas para seção atual ou para submissão
  const validateAnswers = (sectionToValidate?: number): boolean => {
    const sectionIndex = sectionToValidate !== undefined ? sectionToValidate : currentSection;

    const questions = esgSections[sectionIndex].questions;

    for (let i = 0; i < questions.length; i++) {
      const key = `${sectionIndex}-${i}`;
      if (!answers[key]?.trim()) {
        alert(`Por favor, responda a pergunta ${sectionIndex + 1}.${i + 1} na seção "${esgSections[sectionIndex].title}"`);
        setCurrentSection(sectionIndex);
        return false;
      }
    }

    return true;
  };

  // Submete o formulário
  const handleSubmit = async () => {
    if (isSubmitting) return;

    // Valida todas as seções
    for (let i = 0; i < esgSections.length; i++) {
      if (!validateAnswers(i)) return;
    }

    setIsSubmitting(true);

    try {
      const report = generateReport();

      const response = await axios.post("/api/chat", {
        fullReport: report,
        answers,
        sections: esgSections,
      });

      if (response.data?.relatorioCompleto) {
        // Limpa estado após sucesso
        setAnswers({});
        setUploadedFiles([]);
        setApiResponse("");
        setCurrentSection(0);
        setActiveQuestionIndex(null);

        // Armazena dados no Zustand
        setEsgData({
          generatedReport: response.data.relatorioCompleto,
          answers,
          sections: esgSections,
        });

        setStoreResponse(response.data.relatorioCompleto);

        router.push("/Chat");
      }
    } catch (error) {
      console.error("Erro ao gerar relatório:", error);

      let errorMessage = "Ocorreu um erro ao gerar o relatório.";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage;
      }

      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Avança para próxima seção se respostas válidas
  const nextSection = () => {
    if (!validateAnswers(currentSection)) return;
    if (currentSection < esgSections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  // Volta para seção anterior
  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const isLastSection = currentSection === esgSections.length - 1;

  // Função para processar pergunta sobre ESG (exemplo simples)
  const processESGQuestion = (question: string): string => {
    const { esgData } = useStore.getState();

    if (!esgData) return "Não encontrei os dados do relatório ESG.";

    const sectionMatch = question.match(/seção (\d+)/i);

    if (sectionMatch) {
      const sectionIndex = parseInt(sectionMatch[1], 10) - 1;

      if (sectionIndex >= 0 && sectionIndex < esgData.sections.length) {
        const section = esgData.sections[sectionIndex];
        let response = `Seção ${sectionIndex + 1}: ${section.title}\n\n`;

        section.questions.forEach((q: string, i: number) => {
          const answerKey = `${sectionIndex}-${i}`;
          response += `Pergunta ${i + 1}: ${q}\n`;
          response += `Resposta: ${esgData.answers[answerKey] || "Não respondido"}\n\n`;
        });

        return response;
      }
      return `Seção ${sectionIndex + 1} não encontrada no relatório.`;
    }

    return `Analisando sua pergunta sobre o relatório ESG: "${question}"`;
  };


  

return (
  <main className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-gray-900 to-black px-4 sm:px-6 lg:px-8 min-w-[320px]">
    <div className="w-full max-w-4xl z-10 pt-20 pb-12 sm:pt-12 sm:pb-20">
      {/* Form Container */}
      <div className="bg-white/5 p-6 sm:p-8 rounded-xl border border-white/10 backdrop-blur-lg shadow-xl">
        {/* Section Header */}
        <div className="mb-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl sm:text-2xl font-semibold bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 text-transparent">
              {currentSection + 1}. {esgSections[currentSection].title}
            </h3>
            
            {/* Botão de Ajuda */}
            <button 
              onClick={() => setIsHelpModalOpen(true)}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors border border-white/10"
              aria-label="Ajuda"
            >
              <FiHelpCircle className="text-blue-400 text-lg sm:text-xl" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="bg-white/5 p-2 rounded-lg border border-white/10 flex items-center mb-6">
            <div className="w-full bg-white/10 rounded-full h-2.5">
              <div
                className="bg-gradient-to-r from-blue-500 to-emerald-500 h-2.5 rounded-full transition-all duration-500"
                style={{
                  width: `${((currentSection + 1) / esgSections.length) * 100}%`,
                }}
              ></div>
            </div>
            <span className="ml-3 text-sm text-gray-300">
              {Math.round(((currentSection + 1) / esgSections.length) * 100)}%
              completado
            </span>
          </div>

          {/* Questions */}
          <div className="space-y-6">
            {esgSections[currentSection].questions.map((question, index) => (
              <div key={index} className="animate-fade-in">
                <div className="flex justify-between items-start mb-2">
                  <label className="block text-sm sm:text-base font-medium text-gray-300">
                    {currentSection + 1}.{index + 1} {question} *
                  </label>
                  <button 
                    onClick={() => setActiveQuestionIndex(index)}
                    className="text-xs text-blue-400 hover:text-blue-300 flex items-center"
                  >
                    <FiHelpCircle className="mr-1" /> Dicas
                  </button>
                </div>
                <textarea
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all duration-300 placeholder-gray-400 resize-y min-h-[120px]"
                  value={answers[`${currentSection}-${index}`] || ""}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                  placeholder="Digite sua resposta aqui..."
                  required
                />
                {activeQuestionIndex === index && (
                  <div className="mt-2 text-xs text-gray-400 bg-white/5 p-2 rounded border border-white/10">
                    {esgSections[currentSection].hints?.[index] || "Dicas não disponíveis para esta pergunta."}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-white/10">
            <Button
              variant="secondary"
              size="lg"
              className="rounded-full px-6 border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-lg transition-all duration-300 w-full sm:w-auto"
              onClick={prevSection}
              disabled={currentSection === 0}
            >
              Voltar
            </Button>

            {currentSection < esgSections.length - 1 ? (
              <Button
                size="lg"
                className="rounded-full px-6 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg shadow-blue-500/20 w-full sm:w-auto"
                onClick={nextSection}
              >
                Próxima Seção
              </Button>
            ) : (
              <Button
                size="lg"
                className="rounded-full px-6 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 transition-all duration-300 shadow-lg shadow-emerald-500/20 w-full sm:w-auto"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Enviando...
                  </span>
                ) : (
                  "Enviar Formulário"
                )}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Report Preview Section */}
      {apiResponse && (
        <div className="bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-lg mt-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <h3 className="text-xl sm:text-2xl font-semibold bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 text-transparent">
              Pré-visualização do Relatório
            </h3>
            <PDFDownloadLink
              document={
                <ESGReportPDF answers={answers} esgSections={esgSections} />
              }
              fileName="relatorio_esg.pdf"
            >
              {({ loading }) => (
                <Button
                  variant="outline"
                  className="bg-emerald-600/90 hover:bg-emerald-700/90 text-white border-emerald-700 w-full sm:w-auto"
                  disabled={loading}
                >
                  {loading ? "Gerando PDF..." : "Download PDF"}
                </Button>
              )}
            </PDFDownloadLink>
          </div>

          <div className="h-[400px] sm:h-[500px] border border-white/10 rounded-lg overflow-hidden bg-white">
            <PDFViewer width="100%" height="100%" className="min-h-[400px] sm:min-h-[500px]">
              <ESGReportPDF answers={answers} esgSections={esgSections} />
            </PDFViewer>
          </div>
        </div>
      )}

      {/* Modal de Ajuda */}
      {isHelpModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 pt-10">
          <div className="bg-gray-800 rounded-xl border border-white/10 max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                Ajuda - {esgSections[currentSection].title}
              </h3>
              <button 
                onClick={() => setIsHelpModalOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <FiX className="text-gray-400" />
              </button>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-300">
                Esta seção aborda os principais aspectos de {esgSections[currentSection].title.toLowerCase()}. Aqui estão algumas orientações:
              </p>
              
              <ul className="space-y-3 list-disc pl-5 text-gray-300">
                {esgSections[currentSection].questions.map((question, index) => (
                  <li key={index}>
                    <strong className="text-blue-300">{currentSection + 1}.{index + 1}:</strong> {question}
                    {esgSections[currentSection].hints?.[index] && (
                      <p className="text-sm text-gray-400 mt-1 pl-4">
                        {esgSections[currentSection].hints[index]}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
              
              <div className="bg-white/5 p-4 rounded-lg border border-white/10 mt-4">
                <h4 className="font-medium text-emerald-400 mb-2">Dicas gerais:</h4>
                <p className="text-sm text-gray-300">
                  • Seja claro e objetivo em suas respostas<br />
                  • Forneça exemplos concretos quando possível<br />
                  • Relacione com dados quantitativos se disponível<br />
                  • Revise suas respostas antes de enviar
                </p>
              </div>
            </div>
            
            <button 
              onClick={() => setIsHelpModalOpen(false)}
              className="mt-6 w-full py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-lg transition-colors"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  </main>
);
}
