# Zeus Lightning - Documentação do Projeto

## 📌 Visão Geral

O **Zeus Lightning** é uma plataforma moderna para geração automatizada de relatórios de sistemas, desenvolvida para a Ibracom. O projeto combina tecnologias front-end avançadas com um design elegante e responsivo para oferecer a melhor experiência de análise de dados.

## ✨ Funcionalidades Principais

- 🚀 Geração automatizada de relatórios
- 📊 Dashboard interativo com visualização de dados
- 🔐 Sistema de autenticação segura
- 💰 Planos flexíveis para diferentes necessidades
- 📱 Design totalmente responsivo
- ⚡ Performance otimizada

## 🛠 Tecnologias Utilizadas

### Front-end
- **Next.js** (v13+) - Framework React para renderização híbrida
- **Tailwind CSS** - Framework CSS utilitário
- **Framer Motion** - Bibliotecas de animação
- **React Icons** - Ícones para a interface
- **TypeScript** - Tipagem estática

### Back-end (API)
- **Next.js API Routes** - Endpoints da aplicação
- **Prisma** - ORM para banco de dados
- **PostgreSQL** - Banco de dados principal

### Ferramentas
- **ESLint** - Linter para qualidade de código
- **Prettier** - Formatação de código
- **Husky** - Git hooks
- **Commitlint** - Padronização de commits

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js (v18+)
- npm ou yarn
- PostgreSQL (configuração no arquivo `.env`)

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/Vinishireis/zeus_lightning.git
cd zeus_lightning
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env.local
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

## 📂 Estrutura de Arquivos

```
zeus_lightning/
├── app/
│   ├── (auth)/
│   ├── dashboard/
│   ├── pricing/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── auth/
│   ├── dashboard/
│   ├── ui/
│   └── aurora-background.tsx
├── lib/
│   ├── auth.ts
│   └── db.ts
├── public/
├── styles/
├── .eslintrc.json
├── .gitignore
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── tsconfig.json
```

## 🎨 Design System

O projeto utiliza um sistema de design consistente com:

### Cores Primárias
- Azul (`#3b82f6`)
- Índigo (`#6366f1`)
- Violeta (`#8b5cf6`)

### Tipografia
- **Inter** - Fonte principal
- Tamanhos responsivos com escala modular

### Componentes
- Botões com efeitos de gradiente
- Cards com efeito glassmorphism
- Animações suaves em interações

## 🌐 Deploy

O projeto pode ser deployado em:

- **Vercel** (recomendado)
- **Netlify**
- **AWS Amplify**
- **Docker** (configuração disponível)

```bash
vercel deploy
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie sua branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request


## ✉️ Contato

Equipe de Desenvolvimento - Fecap Tech Ibracom

---

**Zeus Lightning** © 2023 - Transformando dados em insights relâmpago! ⚡