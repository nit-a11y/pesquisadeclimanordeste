# Plano: Adicionar Pergunta de Unidade na Pesquisa de Clima

## 🎯 Overview
Adicionar uma pergunta de unidade (EUSÉBIO, FORTALEZA, SÃO LUÍS, JUAZEIRO DO NORTE) como primeira pergunta da pesquisa de clima existente, com interface administrativa para filtrar e visualizar dados por unidade.

## ✅ Success Criteria
- [ ] Pergunta de unidade adicionada como primeira pergunta
- [ ] Mock data atualizado com unidades distribuídas
- [ ] Interface admin com filtro por unidade funcionando
- [ ] Dados separados e comparativos por unidade
- [ ] UI leve e bonita para seleção de unidade

## 🏗️ Project Type
**BACKEND + FRONTEND** - Modificação em sistema existente

## 🛠️ Tech Stack
- **Node.js + TypeScript** (existente)
- **SQLite** (existente)
- **React** (existente)
- **CSS Modules** (para UI bonita)

## 📁 File Structure Impact
```
src/
├── constants.ts          (modificar - adicionar pergunta unidade)
├── types.ts             (verificar - adicionar tipo unidade)
├── App.tsx              (ajustar ordem perguntas)
├── components/
│   ├── UnidadeSelector.tsx (novo - UI bonita)
│   └── AdminFilter.tsx     (novo - filtro admin)
database/
├── schema.sql           (verificar migration)
└── migrations/
    └── add_unidade.sql   (novo - adicionar coluna)
gerar-mock.js            (modificar - incluir unidades)
```

## 📋 Task Breakdown

### 🗄️ Tarefa 1: Database Schema
**Agent:** `@database-architect`  
**Skills:** `database-design`  
**Priority:** P0 (Foundation)

| INPUT | OUTPUT | VERIFY |
|-------|--------|--------|
| Schema atual SQLite | Migration para adicionar coluna `unidade` na tabela `responses` | `EXPLAIN` confirma nova coluna, test migration rollback |

**Dependencies:** Nenhuma

---

### ⚙️ Tarefa 2: Backend Types & Constants  
**Agent:** `@backend-specialist`  
**Skills:** `nodejs-best-practices`, `clean-code`  
**Priority:** P1 (Core)

| INPUT | OUTPUT | VERIFY |
|-------|--------|--------|
| Constants atual | Nova pergunta de unidade como primeira pergunta, tipos atualizados | TypeScript compila sem erros, nova pergunta visível |

**Dependencies:** Tarefa 1

---

### 🎨 Tarefa 3: UI Componente Unidade
**Agent:** `@frontend-specialist`  
**Skills:** `frontend-design`, `react-best-practices`  
**Priority:** P1 (Core)

| INPUT | OUTPUT | VERIFY |
|-------|--------|--------|
| Requisito "UI leve e bonita" | Componente `UnidadeSelector.tsx` com cards visuais | Componente renderiza, responsivo, acessível |

**Dependencies:** Tarefa 2

---

### 🔄 Tarefa 4: Mock Data Update
**Agent:** `@backend-specialist`  
**Skills:** `nodejs-best-practices`  
**Priority:** P2 (Data)

| INPUT | OUTPUT | VERIFY |
|-------|--------|--------|
| gerar-mock.js atual | Script atualizado distribuído entre 4 unidades | Mock gera dados com unidade, distribuição balanceada |

**Dependencies:** Tarefa 2

---

### 📊 Tarefa 5: Admin Filter Interface
**Agent:** `@frontend-specialist`  
**Skills:** `frontend-design`, `react-best-practices`  
**Priority:** P2 (Feature)

| INPUT | OUTPUT | VERIFY |
|-------|--------|--------|
| Requisito filtro admin | Componente `AdminFilter.tsx` com dropdown/select | Filtro funciona, dados atualizam dinamicamente |

**Dependencies:** Tarefa 3, Tarefa 4

---

### 🔧 Tarefa 6: App Integration
**Agent:** `@orchestrator`  
**Skills:** `clean-code`, `react-best-practices`  
**Priority:** P2 (Integration)

| INPUT | OUTPUT | VERIFY |
|-------|--------|--------|
| Componentes prontos | App.tsx atualizado com nova ordem e fluxo | Survey flui corretamente, unidade capturada |

**Dependencies:** Tarefa 3, Tarefa 5

---

### 📈 Tarefa 7: Data Visualization
**Agent:** `@frontend-specialist`  
**Skills:** `frontend-design`, `react-best-practices`  
**Priority:** P3 (Polish)

| INPUT | OUTPUT | VERIFY |
|-------|--------|--------|
| Dados por unidade | Gráficos/comparativos por unidade na admin | Visualizações mostram dados separados |

**Dependencies:** Tarefa 5, Tarefa 6

---

## 🔄 Dependencies Graph
```
T1 (Database) → T2 (Types) → T3 (UI) → T6 (Integration)
                ↓              ↓
                T4 (Mock) → T5 (Admin) → T7 (Viz)
```

## 🚀 Parallel Execution Opportunities
- **T3 (UI)** e **T4 (Mock)** podem ser feitos em paralelo após T2
- **T5 (Admin)** pode começar assim que T3 estiver pronto

---

## ✅ PHASE X: Verification

### Pre-deployment Checklist
- [ ] **Database Migration**: Testada em ambiente dev
- [ ] **TypeScript**: Compila sem erros (`npx tsc --noEmit`)
- [ ] **Mock Data**: Gera unidades corretamente
- [ ] **UI Components**: Responsivos e acessíveis
- [ ] **Integration**: Survey completo funciona
- [ ] **Admin Filter**: Filtra dados corretamente

### Security & Performance
- [ ] **SQL Injection**: Queries parametrizadas
- [ ] **Input Validation**: Unidade validada no backend
- [ ] **Performance**: Mock generation otimizado

### User Experience
- [ ] **Mobile**: UI responsivo
- [ ] **Accessibility**: Componentes acessíveis
- [ ] **Error Handling**: Mensagens claras

### Final Verification Commands
```bash
# Type check
npx tsc --noEmit

# Security scan
python .agent/scripts/checklist.py .

# Run tests (se existirem)
npm test

# Start dev server
npm run dev
```

---

## 🎯 Implementation Priority Order
1. **P0**: Database Schema (T1)
2. **P1**: Backend Types (T2) + UI Component (T3) 
3. **P2**: Mock Data (T4) + Admin Filter (T5) + Integration (T6)
4. **P3**: Data Visualization (T7)

---

## 📝 Notes
- **Migration segura**: Adicionar coluna como nullable primeiro
- **UI Design**: Cards visuais com ícones para cada unidade
- **Mock Distribution**: 25% para cada unidade aproximadamente
- **Fallback**: Dados existentes marcados como "Não informado"

---

## ✅ PHASE X COMPLETE
- [ ] Lint: ✅ Pass
- [ ] Security: ✅ No critical issues  
- [ ] Build: ✅ Success
- [ ] Date: [Implementation Date]
