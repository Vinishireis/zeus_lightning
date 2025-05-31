import { NextResponse } from "next/server";

export async function GET() {
  const investors = [
    {
      id: "capital-forte",
      name: "Capital Forte",
      logo: "/images/investors/capital-verde.png",
      title: "Fundo de Investimento em Atacado",
      description: "Foco em distribuidoras e empresas atacadistas com potencial de expansão regional.",
      sectors: ["Atacado", "Logística", "Distribuição"],
      ticket: "R$ 1M - R$ 10M",
      geography: "Brasil"
    },
    {
      id: "food-invest",
      name: "Food Invest Partners",
      logo: "/images/investors/eco-fund.png",
      title: "Especialistas em Alimentício",
      description: "Investimos em empresas de alimentos, bebidas e insumos para o setor.",
      sectors: ["Alimentício", "Bebidas", "Ingredientes"],
      ticket: "R$ 500K - R$ 5M",
      geography: "América Latina"
    },
    {
      id: "mercado-global",
      name: "Mercado Global Capital",
      logo: "/images/investors/sustain-ventures.png",
      title: "Investimento em Comércio Atacadista",
      description: "Apoiamos redes de atacado e distribuição com modelos comprovados.",
      sectors: ["Atacado", "Distribuição", "Varejo Corporativo"],
      ticket: "R$ 2M+",
      geography: "Global"
    },
    {
      id: "agro-food-capital",
      name: "Agro Food Capital",
      logo: "/images/investors/green-growth.png",
      title: "Foco em Alimentos e Agroindústria",
      description: "Parceiros estratégicos para empresas de processamento e comercialização de alimentos.",
      sectors: ["Agroindústria", "Alimentos Processados", "Commodities Agrícolas"],
      ticket: "R$ 3M - R$ 15M",
      geography: "América do Sul"
    },
    {
      id: "distribuidora-invest",
      name: "Distribuidora Invest",
      logo: "/images/investors/earth-capital.png",
      title: "Especialistas em Redes de Distribuição",
      description: "Capital de crescimento para redes de distribuição e atacado consolidados.",
      sectors: ["Atacado", "Distribuição", "Logística"],
      ticket: "R$ 5M+",
      geography: "Brasil"
    },
    {
      id: "traditional-growth",
      name: "Traditional Growth Partners",
      logo: "/images/investors/traditional-growth.png",
      title: "Private Equity para Setores Tradicionais",
      description: "Investimos em empresas maduras de setores convencionais com fluxo estável.",
      sectors: ["Manufatura", "Atacado", "Alimentício"],
      ticket: "R$ 10M+",
      geography: "Global"
    }
  ];

  const sectorsList = [
    "Atacado", "Distribuição", "Alimentício", "Bebidas", "Agroindústria", 
    "Logística", "Manufatura", "Comércio Exterior", "Serviços Corporativos", 
    "Embalagens", "Equipamentos Industriais", "Químicos", "Ingredientes", 
    "Carnes e Derivados", "Grãos e Cereais", "Varejo Corporativo", 
    "Transporte de Cargas", "Armazenagem"
  ];

  return NextResponse.json({ 
    success: true,
    data: {
      investors,
      sectorsList
    }
  }, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600', // Cache de 1 hora
    }
  });
}