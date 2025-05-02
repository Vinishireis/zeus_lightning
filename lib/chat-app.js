import {fullReport} from '../app/Forms/page';
require('dotenv').config(); // Carrega as variáveis de ambiente do .env

const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const OPENIA_API_KEY = process.env.OPENAI_API_KEY; 
let contador = 0;
let previousResponseId = null;
let relatorio = "";

app.post("/api/Chat", async (req, res) => {
    try {
        let requisicao;
        
        if (contador === 0) {
            requisicao = {
                model: "gpt-4.1-mini",
                input: fullReport
            };
        } else if (contador === 1) {
            requisicao = {
                model: "gpt-4.1-mini",
                previous_response_id: previousResponseId,
                messages: [
                    {
                        role: "user",
                        content: "Quero gerar seção por seção, gere a primeira"
                    }
                ]
            };
        } else if (contador <= 9) {
            requisicao = {
                model: "gpt-4.1-mini",
                previous_response_id: previousResponseId,
                messages: [
                    {
                        role: "user",
                        content: "Gere a próxima"
                    }
                ]
            };
        }

        const config = {
            headers: {
                'Authorization': `Bearer ${OPENIA_API_KEY}`, // Usa a chave da variável de ambiente
                'Content-Type': 'application/json'
            }
        };

        const openaiResponse = await axios.post(
            'https://api.openai.com/v1/responses',
            requisicao,
            config
        );

        relatorio += openaiResponse.data.message;
        previousResponseId = openaiResponse.data.id;
        contador++;

        res.status(200).json({
            valido: true,
            mensagem: "Resposta recebida com sucesso",
            resposta: openaiResponse.data
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