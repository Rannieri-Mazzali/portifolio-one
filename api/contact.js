import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Campos obrigatórios faltando' });
    }

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'rannieri.mazzali@outlook.com',
      subject: `Nova mensagem de ${name}`,
      html: `
        <h2>Novo contato</h2>
        <p><b>Nome:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p>${message}</p>
      `
    });

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error('Erro real:', error);
    return res.status(500).json({ error: 'Erro ao enviar email' });
  }
}