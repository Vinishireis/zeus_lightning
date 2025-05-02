import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.fullReport) {
    return NextResponse.json({ error: 'Relatório ausente' }, { status: 400 });
  }

  const fakeRelatorio = `Relatório gerado com base no conteúdo:\n\n${body.fullReport.slice(0, 300)}...`;

  return NextResponse.json({ relatorioCompleto: fakeRelatorio });
}
