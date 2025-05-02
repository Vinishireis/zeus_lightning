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
let contador = 0;
let previousResponseId = null;
let relatorio = "";

app.post("/api/Chat", async (req, res) => {
    try {
        const { fullReport } = req.body;
        
        if (!fullReport) {
            return res.status(400).json({
                valido: false,
                mensagem: "Dados do relatório são necessários"
            });
        }

        let requisicao;
        
        if (contador === 0) {
            requisicao = {
                model: "gpt-4.1-mini",
                messages: [
                    {
                        role: "system",
                        content: "Você é um assistente especializado em gerar relatórios ESG seguindo as normas IFRS S1 e S2."
                    },
                    {
                        role: "user",
                        content: fullReport
                    }
                ]
            };
        } else if (contador === 1) {
            requisicao = {
                model: "gpt-4.1-mini",
                messages: [
                    {
                        role: "system",
                        content: "Você é um assistente especializado em gerar relatórios ESG seguindo as normas IFRS S1 e S2."
                    },
                    {
                        role: "assistant",
                        content: relatorio
                    },
                    {
                        role: "user",
                        content: "Quero gerar seção por seção, gere a primeira"
                    }
                ]
            };
        } else if (contador <= 9) {
            requisicao = {
                model: "gpt-4.1-mini",
                messages: [
                    {
                        role: "system",
                        content: "Você é um assistente especializado em gerar relatórios ESG seguindo as normas IFRS S1 e S2."
                    },
                    {
                        role: "assistant",
                        content: relatorio
                    },
                    {
                        role: "user",
                        content: "Gere a próxima seção"
                    }
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

        const messageContent = openaiResponse.data.choices[0].message.content;
        relatorio += "\n\n" + messageContent;
        contador++;

        res.status(200).json({
            valido: true,
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