# 🌟 Pesquisa de Clima Organizacional - Nordeste Locações

Uma aplicação moderna e interativa para pesquisa de clima organizacional, desenvolvida com React, TypeScript e Tailwind CSS. Esta ferramenta ajuda a Nordeste Locações a medir a satisfação dos colaboradores em diversas áreas do ambiente de trabalho.

## 📋 Visão Geral

A pesquisa avalia múltiplos aspectos do ambiente de trabalho através de categorias estruturadas, fornecendo insights valiosos para a melhoria contínua da organização.

## 🏗️ Estrutura da Pesquisa

A aplicação está organizada em 8 categorias principais:

### 1. 🏢 Infraestrutura de Trabalho
Avalia ambiente físico, equipamentos e recursos para trabalhar.

### 2. 💻 Sistemas e Tecnologia  
Avalia o impacto das ferramentas tecnológicas na produtividade.

### 3. 🔄 Processos e Organização
Avalia se os fluxos de trabalho estão claros e eficientes.

### 4. 🤝 Comunicação e Integração
Avalia a colaboração entre diferentes setores da empresa.

### 5. 👥 Liderança e Gestão
Avalia o estilo de liderança e suporte oferecido.

### 6. 💡 Inovação e Melhoria
Avalia a cultura de inovação e busca por melhorias.

### 7. ❤️ Satisfação e Engajamento
Avalia o nível de satisfação e comprometimento dos colaboradores.

### 8. ⚡ Impacto NIT
Avalia especificamente o impacto do NIT (Núcleo de Inovação Tecnológica).

## 🚀 Tecnologias Utilizadas

- **React 19** - Biblioteca principal para construção da interface
- **TypeScript** - Tipagem estática para maior robustez
- **Vite** - Build tool rápido e moderno
- **Tailwind CSS** - Framework CSS para estilização
- **Motion/Framer Motion** - Animações fluidas e interativas
- **Lucide React** - Ícones modernos e consistentes

## 📦 Instalação e Configuração

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn

### Passos para instalação

1. **Clone o repositório**
   ```bash
   git clone <URL-DO-REPOSITORIO>
   cd pesquisa-de-clima---nordeste-locações
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**
   ```bash
   cp .env.example .env
   # Edite o arquivo .env com suas configurações
   ```

4. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

5. **Acesse a aplicação**
   Abra `http://localhost:3000` no seu navegador.

## 🎯 Funcionalidades Principais

### ✨ Interface Intuitiva
- Design moderno e responsivo
- Navegação por etapas clara e progressiva
- Indicadores visuais de progresso

### 📊 Sistema de Avaliação
- Escala de 5 níveis com emojis representativos
- Perguntas abertas para feedback qualitativo
- Validação em tempo real

### 🎨 Animações Fluidas
- Transições suaves entre categorias
- Feedback visual interativo
- Experiência de usuário agradável

### 📱 Responsividade
- Layout adaptável para diferentes dispositivos
- Otimização para mobile e desktop
- Acessibilidade e usabilidade

## 🔧 Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm run preview` - Preview do build de produção
- `npm run lint` - Verificação de tipos TypeScript
- `npm run clean` - Limpa diretório de build

## 📁 Estrutura do Projeto

```
src/
├── App.tsx          # Componente principal da aplicação
├── constants.ts     # Definições das categorias e perguntas
├── types.ts         # Tipos TypeScript utilizados
├── main.tsx         # Ponto de entrada da aplicação
└── index.css        # Estilos globais
```

## 🎨 Personalização

### Cores e Identidade Visual
A aplicação utiliza as cores institucionais da Nordeste Locações e do NIT, mantendo identidade visual consistente com a marca.

### Ícones e Elementos Visuais
- Sistema de ícones Lucide React para consistência
- Emojis para representação emocional nas avaliações
- Logotipos institucionais integrados

## 🔒 Segurança e Privacidade

- Dados coletados de forma anônima
- Sem armazenamento de informações pessoais
- Foco exclusivo em métricas organizacionais

## 🚀 Deploy

### Build para Produção
```bash
npm run build
```

O diretório `dist/` conterá todos os arquivos otimizados para deploy.

### Configuração de Produção
- Configure a variável `APP_URL` no ambiente de produção
- Verifique as configurações de servidor e segurança
- Teste todas as funcionalidades antes do deploy

## 🤝 Contribuição

Este projeto é mantido pela equipe Nordeste Locações em parceria com o NIT.

## 📞 Suporte

Para dúvidas ou suporte técnico, entre em contato com a equipe responsável.

---

**Desenvolvido com ❤️ pela equipe Nordeste Locações | Powered by NIT**
