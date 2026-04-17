import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Carregar variáveis de ambiente
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(join(__dirname, 'public')));

// Rotas API
app.get('/api/portfolio', (req, res) => {
  try {
    const data = fs.readFileSync(join(__dirname, 'src/data/portfolio-data.json'), 'utf-8');
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: 'Erro ao carregar dados' });
  }
});

app.get('/api/experience', (req, res) => {
  try {
    const data = fs.readFileSync(join(__dirname, 'src/data/portfolio-data.json'), 'utf-8');
    const json = JSON.parse(data);
    res.json(json.experience);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao carregar experiência' });
  }
});

app.get('/api/reviews', (req, res) => {
  try {
    const data = fs.readFileSync(join(__dirname, 'src/data/portfolio-data.json'), 'utf-8');
    const json = JSON.parse(data);
    res.json(json.reviews);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao carregar reviews' });
  }
});

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Campos obrigatórios faltando' });
  }

  try {
    // Configurar transporter do Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'outlook',
      auth: {
        user: process.env.EMAIL_USER || 'rannieri.mazzali@outlook.com',
        pass: process.env.EMAIL_PASS || ''
      }
    });

    // Enviar email
    const mailOptions = {
      from: process.env.EMAIL_USER || 'rannieri.mazzali@outlook.com',
      to: 'rannieri.mazzali@outlook.com',
      subject: `Nova mensagem de contato de ${name}`,
      html: `
        <h2>Nova Mensagem de Contato</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    };

    await transporter.sendMail(mailOptions);
    
    console.log('📧 Email enviado com sucesso de:', email);
    res.json({ success: true, message: 'Mensagem enviada com sucesso!' });
  } catch (error) {
    console.error('❌ Erro ao enviar email:', error.message);
    // Se falhar o envio, ainda assim retorna sucesso para não quebrar o UX
    res.status(500).json({ 
      success: false, 
      message: 'Erro ao enviar mensagem. Por favor, tente contactar diretamente.' 
    });
  }
});

// Servir HTML principal
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'public/index.html'));
});

// Erro 404
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`\n🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📱 Abrir no navegador: http://localhost:${PORT}`);
  console.log(`⌨️  Pressione Ctrl+C para parar\n`);
});
