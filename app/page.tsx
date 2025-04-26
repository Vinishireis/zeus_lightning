import { Button } from "@/components/ui/button";


export default function Home() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-black">
      <div className="text-center space-y-6 max-w-2xl z-10 px-4">
        {/* Badge */}
        <span className="inline-block py-1.5 px-4 bg-gradient-to-r from-blue-900/40 to-emerald-900/40 backdrop-blur-md rounded-full text-white text-sm md:text-base border border-white/10 tracking-wide">
          TRANSFORME SEUS DADOS EM INSIGHTS
        </span>

        {/* Headings */}
        <div className="space-y-2">
          <h1 className="text-5xl md:text-7xl tracking-tighter bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-cyan-400 text-transparent font-bold leading-tight">
            Zeus
          </h1>
          <h2 className="text-5xl md:text-7xl tracking-tighter bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-500 text-transparent font-bold leading-tight">
            Lightning
          </h2>
        </div>

        {/* Description */}
          <p className="text-gray-300/90 text-lg md:text-xl text-pretty leading-relaxed max-w-3xl mx-auto">
            <span className="bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent font-semibold">
              Plataforma avançada
            </span>{" "}
            para análise automatizada e geração de{" "}
            <span className="bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 text-transparent font-semibold">
              relatórios de sistemas
            </span>
            . Transforme dados brutos em{" "}
            <span className="bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent font-semibold">
              informações acionáveis
            </span>{" "}
            com nossa solução completa para o projeto Ibracom.
          </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Button size="lg" className="rounded-full px-8 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg shadow-blue-500/20">
            Gerar Relatórios
          </Button>
          <Button variant="secondary" size="lg" className="rounded-full px-8 border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-lg transition-all duration-300">
            Acessar Dashboard
          </Button>
        </div>

        {/* Destaques */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-3 pt-6 text-xs sm:text-sm">
  {/* Item 1 - Eficiência */}
  <div className="bg-white/5 p-2 sm:p-3 rounded-lg border border-white/10 flex items-center justify-center">
    <span className="text-cyan-400 font-medium">+95%</span>
    <span className="ml-1 text-gray-300">eficiência</span>
  </div>

  {/* Item 2 - Relatórios */}
  <div className="bg-white/5 p-2 sm:p-3 rounded-lg border border-white/10 flex items-center justify-center">
    <span className="text-emerald-400 font-medium">Relatórios</span>
    <span className="ml-1 text-gray-300">personalizados</span>
  </div>

  {/* Item 3 - Integração */}
  <div className="bg-white/5 p-2 sm:p-3 rounded-lg border border-white/10 col-span-2 sm:col-span-1 flex items-center justify-center">
    <span className="text-blue-400 font-medium">Integração</span>
    <span className="ml-1 text-gray-300">simplificada</span>
  </div>

  {/* Item 4 - IFRS */}
  <div className="bg-white/5 p-2 sm:p-3 rounded-lg border border-white/10 col-span-2 sm:col-span-1 flex items-center justify-center">
    <span className="text-blue-500 font-medium">Dados</span>
    <span className="ml-1 text-gray-300">com IFRS</span>
  </div>
</div>
      </div>
    </main>
  );
}