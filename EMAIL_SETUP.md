# Instruções para configurar o envio de emails

## Development (local)

1. Edite o arquivo `.env` na raiz do projeto:
```
EMAIL_USER=rannieri.mazzali@outlook.com
EMAIL_PASS=sua_senha_outlook_aqui
```

2. Se você tem autenticação de dois fatores (2FA) no Outlook, gere uma **Senha de Aplicação**:
   - Vá para https://account.microsoft.com/security/
   - "Advanced security options"
   - Gere uma "App password" para Outlook Mail
   - Use essa senha no .env

3. Teste localmente:
```bash
npm start
# O servidor estará em http://localhost:3000
```

## Production (Vercel)

1. No painel do Vercel (https://vercel.com/):
   - Vá até o projeto "portifolio-one"
   - Settings → Environment Variables
   - Adicione:
     - `EMAIL_USER`: rannieri.mazzali@outlook.com
     - `EMAIL_PASS`: sua_senha_outlook_aqui
   
2. Deploy automaticamente atualizado

## Nota de Segurança

⚠️ **Nunca commite o arquivo `.env`** para o GitHub. Ele está no `.gitignore`.
⚠️ **Use App Password**, não sua senha pessoal do Outlook.
