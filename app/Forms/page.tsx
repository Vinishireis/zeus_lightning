'use client'
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from 'axios';

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
];

const esgSectionsText = `1. Visão Geral da Organização\n1. Qual é o modelo de negócio da sua empresa (principais produtos, serviços, mercado e cadeia de valor)?\n2. Quais são os principais fatores do ambiente operacional que afetam sua estratégia (ex.: regulação, concorrência, tendências)?\n3. Quais são os pilares estratégicos da empresa relacionados à sustentabilidade?\n4. Como é estruturado o relacionamento com stakeholders? Liste os grupos-chave e seus canais de interação.\n\n2. Governança de Sustentabilidade e Clima\n5. Existe um comitê de sustentabilidade ou equivalente? Descreva sua composição e atribuições.\n6. Qual é o papel do Conselho de Administração e da Diretoria na supervisão de questões ESG e climáticas?\n7. Há definição de responsabilidades específicas para riscos climáticos e ESG dentro da organização?\n\n3. Estratégia e Gestão de Riscos e Oportunidades\n8. Quais riscos climáticos físicos e de transição foram identificados como relevantes para a empresa?\n9. Quais oportunidades relacionadas à sustentabilidade e clima foram identificadas?\n10. Como esses riscos e oportunidades impactam a estratégia, o modelo de negócio e a performance?\n11. A empresa utiliza análise de cenários climáticos (ex.: +1,5°C, +2°C)? Descreva os principais resultados e aprendizados.\n\n4. Gestão e Monitoramento\n12. Quais processos são utilizados para identificar e avaliar riscos ESG e climáticos?\n13. Como esses riscos são integrados à matriz de riscos corporativos?\n14. Existe algum sistema ou ferramenta de monitoramento e controle dos riscos ESG?\n\n5. Métricas e Indicadores\n15. Quais metas ESG e climáticas foram definidas pela empresa? (curto, médio e longo prazo)\n16. A empresa monitora emissões de GEE? Se sim, indique os dados mais recentes de Escopo 1, 2 e 3.\n17. Há plano de descarbonização ou transição energética em andamento? Detalhe os principais marcos.\n18. Quais outros indicadores ESG (ex.: diversidade, consumo de água, gestão de resíduos) são monitorados?\n19. A empresa utiliza frameworks como SASB ou GRI para seus indicadores? Especifique quais e como são aplicados.\n\n6. Conectividade com Informações Financeiras\n20. Como os riscos ESG e climáticos impactam os resultados financeiros (ativos, passivos, receita, despesas)?\n21. Há efeitos sobre o fluxo de caixa ou o custo de capital da empresa relacionados à sustentabilidade?\n22. A empresa considera esses impactos nas projeções e orçamentos?\n\n7. Base para Preparação e Apresentação\n23. Qual é a periodicidade planejada para a publicação do relatório ESG?\n24. Quais princípios de materialidade e julgamento são aplicados na definição dos conteúdos?\n25. A empresa declara conformidade com as normas IFRS S1 e S2? Há alguma limitação ou ressalva?\n\n8. Anexos e Complementos\n26. Deseja incluir um índice cruzado com normas como GRI, SASB ou TCFD?\n27. Quais fontes metodológicas ou bases de dados são utilizadas para as métricas e indicadores?\n28. Deseja incluir um glossário com termos técnicos ou específicos do seu setor?`;

const reportGuidelines = `Sua função será gerar Relatórios de ESG completo e personalizado para empresas de diferentes setores, com alto padrão de apresentação e profundidade analítica. O relatório deve ter linguagem clara, objetiva e voltada para CEOs, investidores e instituições financeiras. Diretrizes obrigatórias: 1. A estrutura do relatório deve seguir integralmente as normas IFRS S1 (divulgação de sustentabilidade) e IFRS S2 (divulgação de riscos climáticos). 2. Normas complementares podem ser utilizadas apenas quando os temas não forem contemplados por IFRS S1/S2, desde que não entrem em conflito. As normas complementares autorizadas são: • GRI (Global Reporting Initiative) • Integrated Reporting (IIRC) • SASB (Sustainability Accounting Standards Board) • TCFD (Task Force on Climate-related Financial Disclosures) Estrutura do Relatório: Utilize os seguintes capítulos e subtópicos, com base nas normas citadas: 1. Visão Geral da Organização • Modelo de negócio, ambiente operacional e estratégia (IFRS S1) • Governança e controle interno sobre sustentabilidade (IFRS S1/S2) • Relacionamento com stakeholders (GRI/IIRC) 2. Governança de Sustentabilidade e Clima • Comitês, competências e papéis decisórios (IFRS S1/S2) • Supervisão de riscos e oportunidades climáticas (TCFD) 3. Estratégia e Gestão de Riscos e Oportunidades • Identificação de riscos ESG e climáticos (IFRS S1/S2) • Integração ao plano de negócios e uso de cenários (IFRS S2/TCFD) 4. Gestão e Monitoramento • Processos de identificação, avaliação e resposta a riscos ESG • Integração com a gestão de riscos corporativos (IFRS S1/S2, TCFD) 5. Métricas e Indicadores • Metas e indicadores ESG e climáticos (IFRS S1/S2, SASB, GRI) • Emissões GEE (escopos 1, 2 e 3), metas de descarbonização e planos de transição 6. Conectividade com Informações Financeiras • Efeitos financeiros dos riscos ESG (IFRS S1/S2, TCFD) • Impactos em ativos, passivos, fluxo de caixa e acesso a capital 7. Base para Preparação e Apresentação • Periodicidade do relatório, princípios de materialidade, premissas e julgamentos • Declaração de conformidade com as normas IFRS S1 e S2 8. Anexos e Complementos • Índice de conteúdo cruzado com GRI, SASB e outras normas • Glossário de termos, fontes metodológicas e referências. Dados de entrada: A IA receberá as informações por meio de um questionário padrão (com 32 questões), estruturado em 9 seções, que abrangem desde visão organizacional até aspectos gráficos e visuais do relatório. Essas respostas serão utilizadas como base para gerar conteúdo exclusivo, preciso e alinhado às normas internacionais.Dados de entrada:`;

export default function ESGFormPage() {
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedReport, setGeneratedReport] = useState("");

  const handleAnswerChange = (questionIndex: number, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [`${currentSection}-${questionIndex}`]: value
    }));
  };

  const generateReport = () => {
    // Formatando as respostas para inclusão no relatório
    let answersText = "";
    
    esgSections.forEach((section, sectionIndex) => {
      answersText += `${sectionIndex + 1}. ${section.title}`;
      
      section.questions.forEach((question, questionIndex) => {
        const answerKey = `${sectionIndex}-${questionIndex}`;
        answersText += `${sectionIndex + 1}.${questionIndex + 1} ${question}`;
        answersText += `Resposta: ${answers[answerKey] || "Não respondido"}`;
      });
    });

    // Concatenando com as diretrizes
     const fullReport = reportGuidelines + answersText;
    setGeneratedReport(fullReport);
    
    // Aqui você pode adicionar a lógica para enviar para a API ou fazer download
    console.log("Relatório gerado:", fullReport);
  };


  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Simulando processamento
      await new Promise(resolve => setTimeout(resolve, 1000));
      generateReport();
      alert("Relatório gerado com sucesso!");
    } catch (error) {
      console.error("Erro ao gerar relatório:", error);
      alert("Ocorreu um erro ao gerar o relatório.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClick = async () => {
    try {
      const response = await axios.post('http://localhost/api/Chat');
    } catch (error) {
      console.error('Erro ao chamar API:', error);
    }
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-black p-4">
      <div className="w-full max-w-4xl z-10">
        {/* Badge */}
        <div className="text-center mb-6">
          <span className="inline-block py-1.5 px-4 bg-gradient-to-r from-blue-900/40 to-emerald-900/40 backdrop-blur-md rounded-full text-white text-sm md:text-base border border-white/10 tracking-wide">
            FORMULÁRIO ESG COMPLETO
          </span>
        </div>

        {/* Headings */}
        <div className="text-center space-y-2 mb-6">
          <h1 className="text-4xl md:text-6xl tracking-tighter bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-cyan-400 text-transparent font-bold leading-tight">
            Zeus ESG
          </h1>
          <h2 className="text-3xl md:text-5xl tracking-tighter bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-500 text-transparent font-bold leading-tight">
            Lightning Form
          </h2>
        </div>

        {/* Form Container */}
        <div className="bg-white/5 p-6 sm:p-8 rounded-xl border border-white/10 backdrop-blur-lg mb-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibold bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 text-transparent mb-2">
              {currentSection + 1}. {esgSections[currentSection].title}
            </h3>
            
            {/* Progress Bar */}
            <div className="bg-white/5 p-2 rounded-lg border border-white/10 flex items-center mb-4">
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
                <div key={index}>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {currentSection + 1}.{index + 1} {question}
                  </label>
                  <textarea
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all duration-300"
                    rows={4}
                    value={answers[`${currentSection}-${index}`] || ""}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4">
            <Button
              variant="secondary"
              size="lg"
              className="rounded-full px-6 border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-lg transition-all duration-300"
              onClick={() => setCurrentSection(prev => Math.max(0, prev - 1))}
              disabled={currentSection === 0}
            >
              Voltar
            </Button>
            
            {currentSection < esgSections.length - 1 ? (
              <Button
                size="lg"
                className="rounded-full px-6 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg shadow-blue-500/20"
                onClick={() => setCurrentSection(prev => prev + 1)}
              >
                Próxima Seção
              </Button>
            ) : (
              <Button
                size="lg"
                className="rounded-full px-6 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 transition-all duration-300 shadow-lg shadow-emerald-500/20"
                onClick={handleClick}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "Enviar Formulário"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

