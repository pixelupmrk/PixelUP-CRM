// server.js (Gemini) - ESM
import "dotenv/config";
import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/genai";

const app = express();
app.use(cors());                 // libere CORS para seu CRM acessar
app.use(express.json());         // parse JSON no body

// --- Config ---
const port = process.env.PORT || 3000;
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("✖ GEMINI_API_KEY não definida no .env");
  process.exit(1);
}

// Inicializa cliente Gemini
const genai = new GoogleGenerativeAI({ apiKey });

// Healthcheck
app.get("/", (_req, res) => {
  res.send("PixelUp Bot (Gemini) rodando 🚀");
});

// Rota de chat (pré-atendimento)
app.post("/chat", async (req, res) => {
  try {
    const userMsg = String(req.body?.message ?? "").trim();
    if (!userMsg) {
      return res.status(400).json({ error: "Campo 'message' é obrigatório." });
    }

    // Modelo rápido e econômico; troque se quiser (ex.: gemini-2.5-pro)
    const model = genai.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Prompt de sistema: guia o comportamento do bot
    const systemPrompt = `
Você é o bot de pré-atendimento da PixelUp.
Objetivo: coletar (1) nome, (2) WhatsApp/telefone, (3) serviço desejado,
(4) urgência (hoje/esta semana/semana que vem), e (5) cidade.
Se o usuário já deu algum item, avance para o próximo.
Seja objetivo, amigável e peça confirmação antes de encerrar.
Retorne respostas curtas que caibam em balões de chat.
`;

    // Se quiser "forçar" JSON estruturado depois, dá pra ativar (ver nota no final)
    const result = await model.generateContent({
      contents: [
        { role: "user", parts: [{ text: `${systemPrompt}\n\nMensagem do cliente: ${userMsg}` }] }
      ]
    });

    const reply = result.response?.text()?.trim() || "Ok!";
    return res.json({ reply });
  } catch (err) {
    console.error("Erro /chat:", err);
    return res.status(500).json({ error: "Falha ao gerar resposta da IA." });
  }
});

// (Opcional) Rota de teste simples GET
app.get("/echo", (req, res) => {
  const q = String(req.query.q ?? "Olá!");
  res.json({ ok: true, echo: q });
});

// Sobe o servidor
app.listen(port, () => {
  console.log(`✅ Servidor em http://localhost:${port}`);
});
