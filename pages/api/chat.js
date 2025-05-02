import axios from 'axios';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  console.log("Entrou no endpoint")
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    const { fullReport } = req.body;
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

    return res.status(200).json({
      mensagem: 'Resposta recebida com sucesso',
      relatorioCompleto: relatorio,
    });
  } catch (error) {
    console.error('Erro:', error.response?.data || error.message);
    return res.status(500).json({
      mensagem: 'Erro ao gerar relatório',
      erro: error.response?.data || error.message,
    });
  }
}
