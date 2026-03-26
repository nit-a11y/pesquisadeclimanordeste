# Análise Estrutural do Projeto - Pesquisa de Clima Nordeste Locações

## 📋 Visão Geral do Projeto

Este é um sistema de pesquisa de clima organizacional desenvolvido em React + TypeScript com backend Node.js/Express e banco de dados SQLite.

### 🏗️ Arquitetura Atual

```
├── Frontend (React + TypeScript + Vite)
│   ├── src/
│   │   ├── App.tsx          # Aplicação principal
│   │   ├── constants.ts     # Definições das categorias e perguntas
│   │   ├── types.ts         # Tipos TypeScript
│   │   ├── main.tsx         # Ponto de entrada
│   │   └── index.css        # Estilos globais
│
├── Backend (Node.js + Express)
│   ├── server.ts            # Servidor API
│   └── database.sqlite      # Banco de dados local
│
├── Configuração
│   ├── package.json         # Dependências
│   ├── tsconfig.json        # Config TypeScript
│   ├── vite.config.ts       # Config Vite
│   └── .env.example         # Variáveis de ambiente
│
└── Arquivos Auxiliares
    ├── Pesquisa Clima 2026.xlsx
    ├── gerar-mock.js
    ├── limpar-dados.js
    └── verificar-mock.js
```

## 🗄️ Estrutura do Banco de Dados (SQLite)

### Tabela Principal: `survey_responses`

```sql
CREATE TABLE IF NOT EXISTS survey_responses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  timestamp TEXT NOT NULL,
  answers TEXT NOT NULL,      -- JSON com respostas das perguntas
  comments TEXT NOT NULL      -- JSON com comentários adicionais
);
```

### Estrutura dos Dados

#### Respostas (answers)
```json
{
  "amb_1": 4,
  "amb_2": 5,
  "amb_3": 3,
  "comp_1": 4,
  // ... todas as 47 perguntas
  "eq_4": 2
}
```

#### Comentários (comments)
```json
{
  "geral": "Comentário geral sobre a pesquisa",
  "sugestoes": "Sugestões de melhoria",
  "criticas": "Críticas construtivas"
}
```

## 📊 Categorias da Pesquisa

O sistema possui **6 categorias** com **47 perguntas** no total:

### 1. Ambiente de Trabalho (3 perguntas)
- amb_1: Ambiente físico agradável
- amb_2: Equipamentos e recursos adequados
- amb_3: Clima adequado para trabalho

### 2. Comprometimento Organizacional (4 perguntas)
- comp_1: Disposição para fazer além da obrigação
- comp_2: Trabalho tem sentido especial
- comp_3: Orgulho dos colegas
- comp_4: Motivação e engajamento

### 3. Comunicação (3 perguntas)
- com_1: Canais bem definidos
- com_2: Sugestões são ouvidas
- com_3: Líder mantém informado

### 4. Gestão do Capital Humano (16 perguntas)
- gch_1 a gch_16: Treinamento, visão, reconhecimento, remuneração, benefícios, etc.

### 5. Liderança (15 perguntas)
- lid_1 a lid_15: Clareza, expectativas, ética, interesse, aproximação, etc.

### 6. Trabalho em Equipe (4 perguntas)
- eq_1 a eq_4: Colaboração, interesse, sentimento de equipe, politicagem

## 🔌 API Endpoints

### GET /api/responses
- **Descrição**: Retorna todas as respostas da pesquisa
- **Response**: Array de objetos com id, timestamp, answers (JSON), comments (JSON)

### POST /api/responses
- **Descrição**: Salva nova resposta da pesquisa
- **Body**: `{ timestamp, answers, comments }`
- **Response**: `{ success: true }`

### DELETE /api/responses
- **Descrição**: Limpa todas as respostas
- **Response**: `{ success: true }`

## 📱 Fluxo de Dados Atual

1. **Frontend**: React renderiza formulário com 47 perguntas
2. **Usuário**: Responde perguntas (escala 1-5) + comentários
3. **API**: POST /api/responses salva no SQLite
4. **Dashboard**: GET /api/responses exibe resultados

---

# 🔄 Adaptação para Google Sheets + Apps Script

## 🎯 Objetivo da Migração

Substituir o banco de dados SQLite local pelo Google Sheets, mantendo a mesma funcionalidade através de Google Apps Script como backend.

## 🏗️ Nova Arquitetura Proposta

```
├── Frontend (React + TypeScript) - Sem alterações
│   └── Continua consumindo API REST
│
├── Backend (Google Apps Script)
│   ├── Code.gs              # API REST em Apps Script
│   ├── Config.gs            # Configurações da planilha
│   └── Utils.gs             # Funções auxiliares
│
└── Google Sheets
    └── Pesquisa de Clima 2026
        ├── Configuração
        ├── Respostas
        └── Dashboard
```

## 📊 Estrutura do Google Sheets

### Aba 1: Configuração
| A | B | C | D |
|---|---|---|---|
| Categoria | ID Pergunta | Texto da Pergunta | Tipo |

### Aba 2: Respostas
| A | B | C | D | E |
|---|---|---|---|---|
| ID | Timestamp | Categoria | Pergunta ID | Resposta |

### Aba 3: Comentários
| A | B | C |
|---|---|---|
| ID | Timestamp | Comentário |

### Aba 4: Dashboard
| A | B | C | D |
|---|---|---|---|
| Categoria | Média | Total Respostas | Última Atualização |

## 🔧 Google Apps Script - API REST

### Endpoints (mantendo compatibilidade)

#### doGet() - GET /api/responses
```javascript
function doGet(e) {
  if (e.parameter.path === '/api/responses') {
    return getResponses();
  }
}
```

#### doPost() - POST /api/responses
```javascript
function doPost(e) {
  if (e.parameter.path === '/api/responses') {
    return saveResponse(e);
  }
}
```

#### doDelete() - DELETE /api/responses
```javascript
function doDelete(e) {
  if (e.parameter.path === '/api/responses') {
    return clearResponses();
  }
}
```

## 🛠️ Implementação Apps Script

### 1. Config.gs
```javascript
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID';
const CONFIG_SHEET = 'Configuração';
const RESPONSES_SHEET = 'Respostas';
const COMMENTS_SHEET = 'Comentários';
```

### 2. Utils.gs
```javascript
function getSheet(sheetName) {
  return SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(sheetName);
}

function formatResponseData(rows) {
  // Converte dados do Sheets para formato JSON da API
}

function validateResponse(data) {
  // Valida estrutura dos dados
}
```

### 3. Code.gs (API Principal)
```javascript
function getResponses() {
  // Implementação GET /api/responses
}

function saveResponse(e) {
  // Implementação POST /api/responses
}

function clearResponses() {
  // Implementação DELETE /api/responses
}
```

## 🔄 Plano de Migração

### Fase 1: Preparação
1. Criar Google Sheets com estrutura definida
2. Configurar Google Apps Script
3. Implementar API básica

### Fase 2: Migração de Dados
1. Exportar dados do SQLite
2. Importar para Google Sheets
3. Validar integridade

### Fase 3: Atualização Frontend
1. Atualizar URL da API
2. Testar integração
3. Ajustar tratamento de erros

### Fase 4: Deploy
1. Publicar Apps Script como Web App
2. Configurar permissões
3. Testar em produção

## ✅ Benefícios da Migração

### Vantagens
- **Acessibilidade**: Dados acessíveis de qualquer lugar
- **Colaboração**: Múltiplos usuários podem acessar
- **Backup**: Backup automático do Google
- **Análise**: Ferramentas nativas do Sheets
- **Custo**: Sem custos de hospedagem
- **Manutenção**: Sem necessidade de servidor

### Considerações
- **Limitações**: Quotas do Apps Script
- **Performance**: Mais lento que SQLite local
- **Segurança**: Configurar permissões adequadas
- **Offline**: Funciona apenas online

## 🔐 Configuração de Segurança

### Apps Script
- Configurar execução como usuário
- Restringir acesso à organização
- Implementar validação de tokens

### Google Sheets
- Compartilhar apenas com usuários autorizados
- Proteger células importantes
- Auditoria de acessos

## 📈 Monitoramento e Manutenção

### Logs
- Implementar logging no Apps Script
- Monitorar quotas de uso
- Alertas de erros

### Backup
- Exportação periódica dos dados
- Versionamento do Apps Script
- Documentação de alterações

---

## 🚀 Próximos Passos

1. **Criar estrutura Google Sheets**
2. **Implementar Apps Script básico**
3. **Migrar dados existentes**
4. **Testar integração completa**
5. **Documentar processo de deploy**

Esta migração manterá toda a funcionalidade atual enquanto adiciona os benefícios do ecossistema Google Workspace.
