# 🚀 Portfolio Interativo - Rannieri Mazzali

Portfolio profissional moderno, interativo e responsivo desenvolvido com tecnologias web de ponta.

## ✨ Características

- **Design Futurista**: Tema cyberpunk com efeitos neon (cyan e vermelho)
- **Totalmente Responsivo**: Funciona perfeitamente em todos os dispositivos
- **Interativo**: Animações suaves, parallax e efeitos visuais
- **Backend em Node.js**: API RESTful com Express
- **Frontend Moderno**: HTML5, Tailwind CSS, JavaScript vanila (sem frameworks)
- **Performance**: Otimizado para velocidade e acessibilidade

## 📁 Estrutura do Projeto

```
portfolio-one/
├── src/
│   ├── css/              # Estilos customizados
│   ├── js/               # JavaScript utilities
│   └── data/
│       └── portfolio-data.json  # Dados do portfólio
├── public/
│   ├── index.html        # Página principal
│   ├── css/
│   │   └── styles.css    # Estilos neon + animations
│   └── js/
│       └── main.js       # Lógica interativa
├── api/                  # Endpoints da API
├── server.js             # Servidor Express
├── package.json          # Dependências
└── README.md             # Este arquivo
```

## 🛠️ Stack Técnica

**Frontend:**
- HTML5
- CSS3 + Tailwind CSS
- JavaScript ES6+

**Backend:**
- Node.js
- Express.js
- CORS

**Design:**
- Design System Customizado
- Animações keyframe
- Efeitos glass-morphism

## 🚀 Como Executar

### Pré-requisitos
- Node.js 16+ instalado
- npm ou yarn

### Instalação

```bash
# 1. Navegar para a pasta do projeto
cd "portifolio one"

# 2. Instalar dependências
npm install

# 3. Iniciar servidor
npm start
```

O servidor estará disponível em: **http://localhost:3000**

### Desenvolvimento

```bash
# Iniciar com auto-reload (requer nodemon)
npm run dev
```

## 📊 Estrutura de Dados

O portfólio utiliza `portfolio-data.json` com as seguintes seções:

### Personal
- Nome, título, localização
- Email e telefone
- Resumo profissional

### Stack Técnica
- Frontend: React, JavaScript, TypeScript, HTML5, CSS3
- Ferramentas: Git, GitHub
- UX/UI: Usabilidade, Acessibilidade
- Dados: SAP ECC, Análise de Dados

### Experiência
- Front-end Developer (2023 - atual)
- Supervisor Financeiro (2017 - 2023)
- Supervisor de Equipa (2014 - 2017)
- Operações Comerciais (2010 - 2014)

### Reviews
- 4 depoimentos de clientes/colegas

### Projetos
- E-commerce Responsivo
- Landing Page Performance
- Componentes Reutilizáveis

## 🎨 Customização

### Cores Neon
As cores primárias podem ser alteradas em `public/css/styles.css`:

```css
.neon-text {
  color: #00d4ff;  /* Cyan */
  text-shadow: 0 0 10px #00d4ff;
}
```

### Adicionar Novo Projeto

Edite `src/data/portfolio-data.json`:

```json
{
  "id": 4,
  "title": "Novo Projeto",
  "description": "Descrição",
  "tech": ["React", "TypeScript"],
  "metrics": "resultado"
}
```

## 📡 API Endpoints

### GET `/api/portfolio`
Retorna todos os dados do portfólio

### GET `/api/experience`
Retorna apenas dados de experiência

### GET `/api/reviews`
Retorna apenas reviews

### POST `/api/contact`
Envia mensagem de contato

**Payload:**
```json
{
  "name": "Nome",
  "email": "email@example.com",
  "message": "Mensagem"
}
```

## 🎯 Funcionalidades Extras

### Easter Egg 🎮
Pressione: ⬆️ ⬆️ ⬇️ ⬇️ ⬅️ ➡️ ⬅️ ➡️ B A

### Animações
- Fade-in em scroll
- Parallax on mouse
- Neon glow effects
- Blob animations

### Interatividade
- Smooth scroll
- Form validation
- Toast notifications
- Copy to clipboard

## 📱 Responsividade

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## ⚡ Performance

- Zero frameworks pesados
- Dados carregados via API
- CSS otimizado com Tailwind
- Lazy loading ready

## 🔐 Segurança

- CORS habilitado
- Input validation no form
- Senhas não armazenadas
- Dados sensíveis protegidos

## 📝 Notas

- A seção de contato está configurada para logging
- Em produção, implementar envio de email real
- Adicionar autenticação para admin se necessário

## 🤝 Contribuições

Portfolio pessoal - feedback e sugestões bem-vindos!

## 📧 Contato

- **Email**: rannieri.mazzali@outlook.com
- **Telefone**: +351 936 745 950
- **Localização**: Porto, Portugal

## 📄 Licença

MIT License - Todos os direitos reservados (2024)

---

Desenvolvido com ❤️ e ☕ por Rannieri Mazzali
