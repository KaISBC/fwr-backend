const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000; // Usa la porta dinamica o fallback su 3000

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post('/api/fwr', async (req, res) => {
  const { prompt } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });

    res.json({ text: completion.choices[0].message.content.trim() });
  } catch (error) {
    console.error('Errore chiamata OpenAI:', error);
    res.status(500).json({ text: "Errore di connessione a FWR 🐇" });
  }
});

app.listen(port, () => {
  console.log(`Server FWR backend in ascolto su porta ${port}`);
});

