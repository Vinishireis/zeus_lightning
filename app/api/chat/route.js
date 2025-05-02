import axios from 'axios';

export async function POST(request) {
  try {
    const body = await request.json();
    const { fullReport } = body;

    const openai = process.env.CHAVE_OPENIA;
    if (!openai) {
      return new Response(
        JSON.stringify({ mensagem: 'CHAVE_OPENIA não encontrada' }),
        { status: 500 }
      );
    }

    let relatorio = '';
    let previousResponseId = '';

    for (let contador = 0; contador < 10; contador++) {
      let requisicao;

      if (contador === 0) {
        requisicao = {
          model: 'gpt-4.1-mini',
          input: fullReport,
        };
      } else if (contador === 1) {
        requisicao = {
          model: 'gpt-4.1-mini',
          previous_response_id: previousResponseId,
          input: [{ role: 'user', content: 'Quero gerar o relatório seção por seção, me gere a seção 1' }],
        };
      } else {
        requisicao = {
          model: 'gpt-4.1-mini',
          previous_response_id: previousResponseId,
          input: [{ role: 'user', content: 'Gere a próxima seção' }],
        };
      }

      const openaiResponse = await axios.post(
        'https://api.openai.com/v1/responses',
        requisicao,
        {
          headers: {
            'Authorization': `Bearer ${openai}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const messageContent = openaiResponse.data.output[0].content[0].text;
      previousResponseId = openaiResponse.data.id;

      if (contador > 0) {
        relatorio += '\n\n' + messageContent;
      }
    }

    return new Response(JSON.stringify({
      mensagem: 'Resposta recebida com sucesso',
      relatorioCompleto: relatorio,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Erro:', error.response?.data || error.message);

    return new Response(JSON.stringify({
      mensagem: 'Erro ao gerar relatório',
      erro: error.response?.data || error.message,
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// bloqueia outros métodos (GET, PUT, etc.)
export function GET() {
  return new Response(JSON.stringify({ message: 'Método não permitido' }), {
    status: 405,
    headers: { 'Content-Type': 'application/json' },
  });
}
