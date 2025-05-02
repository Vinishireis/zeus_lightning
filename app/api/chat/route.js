import axios from 'axios';

export async function POST(request) {
  try {
    console.log("Entrou no endpoint");
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
    let relatorioFinal = '';
    let previousResponseId = '';

    for (let contador = 0; contador < 11; contador++) {
      let requisicao;

      if (contador === 0) {
        console.log("Mensagem: " + contador);
        requisicao = {
          model: 'gpt-4.1-mini',
          input: fullReport,
        };
      } else if (contador === 1) {
        console.log("Mensagem: " + contador);
        requisicao = {
          model: 'gpt-4.1-mini',
          previous_response_id: previousResponseId,
          input: [{ role: 'user', content: 'Quero gerar o relatório seção por seção, me gere a seção 1' }],
        };
      } else if (contador > 1 && contador <= 9) {
        console.log("Mensagem: " + contador);
        requisicao = {
          model: 'gpt-4.1-mini',
          previous_response_id: previousResponseId,
          input: [{ role: 'user', content: 'Gere a próxima seção' }],
        };
      } else if (contador > 9 && contador <= 10) {
        console.log("Mensagem: " + contador);
        requisicao = {
          model: 'gpt-4.1-mini',
          previous_response_id: previousResponseId,
          input: [{ role: 'user', content: 'Arrume o texto do relatório que concatenei. Deixe apenas a organização em tópicos, sem deixar alguns resíduos da minha conversa com você, adicionando quebra de linha e deixando ele organizado. Relatório para arrumar: ' + relatorio }],
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

      if (contador > 0 && contador < 10) {
        relatorio += '\n\n' + messageContent;
      }else if(contador == 10){
        relatorioFinal = messageContent;
      }
    }
    return new Response(JSON.stringify({
      mensagem: 'Resposta recebida com sucesso',
      relatorioCompleto: relatorioFinal,
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

export function GET() {
  return new Response(JSON.stringify({ message: 'Método não permitido' }), {
    status: 405,
    headers: { 'Content-Type': 'application/json' },
  });
}
