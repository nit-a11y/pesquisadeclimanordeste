# 🚀 Plano de Implantação - Supabase

## 📋 Visão Geral

Migração do banco de dados SQLite local para **Supabase** (PostgreSQL na nuvem) mantendo toda a funcionalidade atual com benefícios de banco de dados online escalável.

## 🎯 Por que Supabase?

### ✅ Vantagens
- **PostgreSQL**: Banco de dados robusto e escalável
- **Real-time**: Sincronização em tempo real
- **API REST**: Endpoints automáticos
- **Auth**: Sistema de autenticação integrado
- **Row Level Security**: Controle de acesso granular
- **Free Tier**: Generoso plano gratuito
- **Dashboard**: Interface administrativa completa

### 🔄 Comparação: SQLite vs Supabase

| Característica | SQLite (Atual) | Supabase (Proposto) |
|---|---|---|
| Hospedagem | Local | Nuvem |
| Escalabilidade | Limitada | Ilimitada |
| Acesso | Local only | Global |
| Backup | Manual | Automático |
| Real-time | ❌ | ✅ |
| API REST | Custom | Automática |
| Auth | ❌ | ✅ Integrado |

---

## 🏗️ Nova Arquitetura

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Supabase      │
│   (React)       │◄──►│   (Node.js)     │◄──►│   (PostgreSQL)  │
│                 │    │                 │    │                 │
│ - Formulários   │    │ - Validação     │    │ - survey_responses│
│ - Dashboard     │    │ - Business Logic│    │ - auth.users    │
│ - Gráficos      │    │ - API Routes    │    │ - Real-time     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

---

## 📊 Estrutura do Banco de Dados (Supabase)

### 1. Tabela Principal: `survey_responses`

```sql
CREATE TABLE survey_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb
);
```

### 2. Tabela de Respostas: `survey_answers`

```sql
CREATE TABLE survey_answers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  response_id UUID REFERENCES survey_responses(id) ON DELETE CASCADE,
  question_id VARCHAR(20) NOT NULL,
  category VARCHAR(50) NOT NULL,
  answer_value INTEGER CHECK (answer_value >= 1 AND answer_value <= 5),
  answer_text TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 3. Tabela de Comentários: `survey_comments`

```sql
CREATE TABLE survey_comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  response_id UUID REFERENCES survey_responses(id) ON DELETE CASCADE,
  comment_type VARCHAR(50) NOT NULL, -- 'geral', 'sugestoes', 'criticas'
  comment_text TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 4. View Consolidada: `survey_responses_complete`

```sql
CREATE VIEW survey_responses_complete AS
SELECT 
  sr.id,
  sr.user_id,
  sr.timestamp,
  sr.created_at,
  sr.metadata,
  jsonb_agg(
    jsonb_build_object(
      'question_id', sa.question_id,
      'category', sa.category,
      'answer', COALESCE(sa.answer_value::text, sa.answer_text)
    )
  ) FILTER (WHERE sa IS NOT NULL) as answers,
  jsonb_agg(
    jsonb_build_object(
      'type', sc.comment_type,
      'text', sc.comment_text
    )
  ) FILTER (WHERE sc IS NOT NULL) as comments
FROM survey_responses sr
LEFT JOIN survey_answers sa ON sr.id = sa.response_id
LEFT JOIN survey_comments sc ON sr.id = sc.response_id
GROUP BY sr.id, sr.user_id, sr.timestamp, sr.created_at, sr.metadata;
```

---

## 🔐 Configuração de Segurança

### 1. Row Level Security (RLS)

```sql
-- Habilitar RLS
ALTER TABLE survey_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE survey_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE survey_comments ENABLE ROW LEVEL SECURITY;

-- Políticas de acesso
CREATE POLICY "Users can view their own responses" ON survey_responses
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own responses" ON survey_responses
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Política para admin (se necessário)
CREATE POLICY "Admins can view all responses" ON survey_responses
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );
```

### 2. Índices para Performance

```sql
-- Índices principais
CREATE INDEX idx_survey_responses_timestamp ON survey_responses(timestamp DESC);
CREATE INDEX idx_survey_answers_response_id ON survey_answers(response_id);
CREATE INDEX idx_survey_answers_question_id ON survey_answers(question_id);
CREATE INDEX idx_survey_comments_response_id ON survey_comments(response_id);

-- Índices compostos
CREATE INDEX idx_survey_answers_composite ON survey_answers(response_id, category);
CREATE INDEX idx_survey_responses_user_timestamp ON survey_responses(user_id, timestamp DESC);
```

---

## 🔧 Configuração do Backend (Node.js)

### 1. Dependências

```bash
npm install @supabase/supabase-js
npm install @supabase/auth-helpers-node
```

### 2. Variáveis de Ambiente (.env)

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Database
DATABASE_URL=postgresql://postgres:[password]@db.your-project.supabase.co:5432/postgres
```

### 3. Cliente Supabase (server.ts)

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Cliente para autenticação
export const supabaseAuth = createClient(
  supabaseUrl, 
  process.env.SUPABASE_ANON_KEY!
);
```

---

## 🔄 Migração dos Dados

### 1. Script de Migração

```javascript
// migrate-to-supabase.js
const { createClient } = require('@supabase/supabase-js');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

async function migrateData() {
  // Conectar ao SQLite
  const sqliteDb = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  });

  // Conectar ao Supabase
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  // Buscar dados do SQLite
  const sqliteResponses = await sqliteDb.all('SELECT * FROM survey_responses');

  console.log(`Migrando ${sqliteResponses.length} respostas...`);

  for (const response of sqliteResponses) {
    try {
      // Inserir resposta principal
      const { data: surveyResponse, error: responseError } = await supabase
        .from('survey_responses')
        .insert({
          timestamp: response.timestamp,
          metadata: { migrated_from: 'sqlite' }
        })
        .select()
        .single();

      if (responseError) throw responseError;

      // Processar answers
      const answers = JSON.parse(response.answers);
      const answerInserts = Object.entries(answers).map(([questionId, value]) => ({
        response_id: surveyResponse.id,
        question_id: questionId,
        category: getCategoryFromQuestionId(questionId),
        answer_value: typeof value === 'number' ? value : null,
        answer_text: typeof value === 'string' ? value : null
      }));

      if (answerInserts.length > 0) {
        const { error: answersError } = await supabase
          .from('survey_answers')
          .insert(answerInserts);
        
        if (answersError) throw answersError;
      }

      // Processar comments
      const comments = JSON.parse(response.comments);
      const commentInserts = Object.entries(comments).map(([type, text]) => ({
        response_id: surveyResponse.id,
        comment_type: type,
        comment_text: text
      })).filter(c => c.comment_text);

      if (commentInserts.length > 0) {
        const { error: commentsError } = await supabase
          .from('survey_comments')
          .insert(commentInserts);
        
        if (commentsError) throw commentsError;
      }

      console.log(`✅ Migrada resposta ${response.id}`);
    } catch (error) {
      console.error(`❌ Erro ao migrar resposta ${response.id}:`, error);
    }
  }

  console.log('🎉 Migração concluída!');
  await sqliteDb.close();
}

function getCategoryFromQuestionId(questionId) {
  const prefix = questionId.split('_')[0];
  const categoryMap = {
    'amb': 'ambiente_trabalho',
    'comp': 'comprometimento',
    'com': 'comunicacao',
    'gch': 'gestao_capital',
    'lid': 'lideranca',
    'eq': 'trabalho_equipe'
  };
  return categoryMap[prefix] || 'outros';
}

migrateData().catch(console.error);
```

---

## 🔄 Atualização da API (server.ts)

### 1. GET /api/responses

```typescript
app.get('/api/responses', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('survey_responses_complete')
      .select('*')
      .order('timestamp', { ascending: false });

    if (error) throw error;

    const responses = data.map(row => ({
      id: row.id,
      timestamp: row.timestamp,
      answers: row.answers.reduce((acc, answer) => {
        acc[answer.question_id] = answer.answer;
        return acc;
      }, {}),
      comments: row.comments.reduce((acc, comment) => {
        acc[comment.type] = comment.text;
        return acc;
      }, {})
    }));

    res.json(responses);
  } catch (error) {
    console.error('Error fetching responses:', error);
    res.status(500).json({ error: 'Failed to fetch responses' });
  }
});
```

### 2. POST /api/responses

```typescript
app.post('/api/responses', async (req, res) => {
  try {
    const { timestamp, answers, comments, userId } = req.body;

    // Inserir resposta principal
    const { data: response, error: responseError } = await supabase
      .from('survey_responses')
      .insert({
        user_id: userId || null,
        timestamp: timestamp || new Date().toISOString()
      })
      .select()
      .single();

    if (responseError) throw responseError;

    // Inserir answers
    const answerInserts = Object.entries(answers).map(([questionId, value]) => ({
      response_id: response.id,
      question_id: questionId,
      category: getCategoryFromQuestionId(questionId),
      answer_value: typeof value === 'number' ? value : null,
      answer_text: typeof value === 'string' ? value : null
    }));

    if (answerInserts.length > 0) {
      const { error: answersError } = await supabase
        .from('survey_answers')
        .insert(answerInserts);
      
      if (answersError) throw answersError;
    }

    // Inserir comments
    const commentInserts = Object.entries(comments).map(([type, text]) => ({
      response_id: response.id,
      comment_type: type,
      comment_text: text
    })).filter(c => c.comment_text);

    if (commentInserts.length > 0) {
      const { error: commentsError } = await supabase
        .from('survey_comments')
        .insert(commentInserts);
      
      if (commentsError) throw commentsError;
    }

    res.status(201).json({ success: true, id: response.id });
  } catch (error) {
    console.error('Error saving response:', error);
    res.status(500).json({ error: 'Failed to save response' });
  }
});
```

---

## 🎯 Frontend - Client Supabase

### 1. Configuração do Cliente

```typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### 2. Real-time Updates (Opcional)

```typescript
// src/hooks/useRealtimeResponses.ts
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export function useRealtimeResponses() {
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    // Subscribe to changes
    const subscription = supabase
      .channel('survey_responses')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'survey_responses' },
        (payload) => {
          console.log('New response:', payload);
          // Atualizar estado local
        }
      )
      .subscribe();

    return () => subscription.unsubscribe();
  }, []);

  return responses;
}
```

---

## 📋 Plano de Implantação

### Fase 1: Preparação (1-2 dias)
- [ ] Criar projeto Supabase
- [ ] Configurar banco de dados
- [ ] Definir variáveis de ambiente
- [ ] Testar conexão

### Fase 2: Migração (1 dia)
- [ ] Executar script de migração
- [ ] Validar dados migrados
- [ ] Comparar com SQLite original

### Fase 3: Atualização Backend (2-3 dias)
- [ ] Instalar dependências Supabase
- [ ] Atualizar endpoints da API
- [ ] Implementar tratamento de erros
- [ ] Testar localmente

### Fase 4: Deploy e Testes (1-2 dias)
- [ ] Deploy para produção
- [ ] Testes completos da API
- [ ] Testes de carga
- [ ] Validação de segurança

### Fase 5: Monitoramento (Contínuo)
- [ ] Configurar alertas
- [ ] Monitorar performance
- [ ] Backup automático
- [ ] Documentação

---

## 🔧 Comandos Úteis

### 1. Criar projeto Supabase
```bash
npx supabase init
npx supabase start
```

### 2. Gerar tipos TypeScript
```bash
npx supabase gen types typescript --project-id your-project-id > src/types/supabase.ts
```

### 3. Executar migração
```bash
node migrate-to-supabase.js
```

### 4. Deploy
```bash
npm run build
npm run deploy
```

---

## 📊 Monitoramento e Métricas

### 1. Dashboard Supabase
- Acessos ao banco
- Performance de queries
- Uso de storage
- Logs de erros

### 2. Métricas de API
- Tempo de resposta
- Taxa de erro
- Volume de requisições
- Usuários ativos

### 3. Alertas
- Erros de conexão
- Queries lentas
- Quotas próximas do limite
- Falhas de autenticação

---

## 🚀 Benefícios Pós-Migração

### Imediatos
- ✅ Banco de dados na nuvem
- ✅ API REST automática
- ✅ Real-time subscriptions
- ✅ Sistema de autenticação
- ✅ Dashboard administrativo

### Longo Prazo
- 📈 Escalabilidade infinita
- 🔐 Segurança avançada (RLS)
- 📊 Analytics integrado
- 💾 Backup automático
- 🌍 Acesso global

---

## ⚠️ Considerações Importantes

### Custos
- **Free Tier**: 500MB database, 50MB storage, 2GB bandwidth
- **Pro Tier**: $25/mês (8GB database, 100GB storage, 250GB bandwidth)
- **Enterprise**: Custom pricing

### Limitações
- Quotas de requisições no plano gratuito
- Limites de conexões simultâneas
- Restrições de storage

### Migração Reversa
- Manter backup do SQLite original
- Documentar processo de rollback
- Testar procedimentos de emergência

---

## 🎉 Conclusão

A migração para Supabase transformará o sistema de pesquisa de clima em uma solução moderna, escalável e com recursos avançados, mantendo 100% da funcionalidade atual enquanto adiciona capacidades empresariais.

**Próximo passo**: Criar projeto Supabase e começar Fase 1! 🚀
