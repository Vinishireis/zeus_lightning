require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors({
  origin: ['https://www.zeus.dev.br', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
let previousResponseId = null;
let relatorio = "";

app.post("/api/Chat", async (req, res) => {
    console.log("Entrou no endpoint do chat")
    try {
        console.log("Começou a tentativa")
        const { fullReport } = req.body;
        console.log(fullReport)
        let requisicao;
        for (let contador = 0; contador < 10; contador++){
            if (contador == 0) {
                console.log("Primeira mensagem para a IA")
                requisicao = {
                    model: "gpt-4.1-mini",
                    input: fullReport
                };
            } else if (contador == 1) {
                console.log("Segunda mensagem para a IA")
                requisicao = {
                    model: "gpt-4.1-mini",
                    previous_response_id: previousResponseId,
                    input: [
                        {
                            role: "user",
                            content: "Quero gerar o relatório seção por seção, me gere a seção 1"
                        },
                    ]
                };
            } else if (contador > 1 && contador <= 9) {
                console.log("Próximas mensagens para a IA")
                requisicao = {
                    model: "gpt-4.1-mini",
                    previous_response_id: previousResponseId,
                    input: [
                        {
                            role: "user",
                            content: "Gere a próxima seção"
                        },
                    ]
                };
            }

            const config = {
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            };
    
            const openaiResponse = await axios.post(
                'https://api.openai.com/v1/responses',
                requisicao,
                config
            );
            const messageContent = openaiResponse.data.output[0].content[0].text;
            const previousResponseId  = openaiResponse.data.id;
            if (contador > 0){
                relatorio += "\n\n" + messageContent;
            }
        }
        console.log("Relatório gerado: " + relatorio)

        res.status(200).json({
            mensagem: "Resposta recebida com sucesso",
            resposta: messageContent,
            relatorioCompleto: relatorio
        });

    } catch (error) {
        console.error('Erro na API OpenAI:', error.response?.data || error.message);
        res.status(502).json({
            valido: false,
            mensagem: "Erro na comunicação com OpenAI",
            erro: error.response?.data || error.message
        });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});