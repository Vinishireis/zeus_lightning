import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import Forms from '../app/Forms/page'

const app = express();
app.use(express.json());

const secretKey = 'sua_chave_secreta_jwt'; // Substitua pela sua chave real
const openaiApiKey = 'sua_chave_openai'; // Substitua pela sua chave da OpenAI

// Endpoint POST para chat com OpenAI
app.post("/api/Chat", async (req, res) => {
    const { token, prompt } = req.body;

        try {
            const openaiResponse = await axios.post(
                'https://api.openai.com/v1/chat/completions', // Endpoint atualizado
                {
                    model: "gpt-4.1-mini", 
                    input: {fullReport},
                },
                {
                    headers: {
                        'Authorization': `Bearer ${openaiApiKey}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            
        } catch (openaiError) {
            console.error('Erro na API OpenAI:', openaiError.response?.data || openaiError.message);
            res.status(502).json({
                valido: true,
                mensagem: "Token válido, mas erro na comunicação com OpenAI",
                erro: openaiError.response?.data || openaiError.message
            });
        }
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});