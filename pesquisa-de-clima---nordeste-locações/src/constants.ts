import { Category } from './types';

export const SURVEY_CATEGORIES: Category[] = [
  {
    id: 'infra',
    title: '1. Infraestrutura de Trabalho',
    description: 'Avalia ambiente físico, equipamentos e recursos para trabalhar.',
    questions: [
      { id: 'infra_1', text: 'O ambiente de trabalho oferece condições adequadas para realizar minhas atividades.', type: 'rating', category: 'infra' },
      { id: 'infra_2', text: 'Os equipamentos que utilizo (computador, ferramentas, máquinas etc.) são adequados para o trabalho.', type: 'rating', category: 'infra' },
      { id: 'infra_3', text: 'Quando há problemas com equipamentos ou infraestrutura, eles são resolvidos rapidamente.', type: 'rating', category: 'infra' },
      { id: 'infra_4', text: 'A empresa investe em melhorias na infraestrutura de trabalho.', type: 'rating', category: 'infra' },
      { id: 'infra_5', text: 'A organização do espaço físico facilita a produtividade.', type: 'rating', category: 'infra' },
      { id: 'infra_open', text: 'O que poderia melhorar na infraestrutura da empresa?', type: 'open', category: 'infra' },
    ]
  },
  {
    id: 'tech',
    title: '2. Sistemas e Tecnologia',
    description: 'Especialmente importante para avaliar o impacto do NIT.',
    questions: [
      { id: 'tech_1', text: 'Os sistemas utilizados na empresa facilitam meu trabalho.', type: 'rating', category: 'tech' },
      { id: 'tech_2', text: 'As informações necessárias estão disponíveis de forma clara nos sistemas.', type: 'rating', category: 'tech' },
      { id: 'tech_3', text: 'Existem muitos processos manuais que poderiam ser automatizados.', type: 'rating', category: 'tech' },
      { id: 'tech_4', text: 'A empresa investe em tecnologia para melhorar processos.', type: 'rating', category: 'tech' },
      { id: 'tech_5', text: 'Os sistemas são confiáveis e raramente apresentam falhas.', type: 'rating', category: 'tech' },
      { id: 'tech_open', text: 'Quais sistemas ou processos poderiam ser automatizados ou melhorados?', type: 'open', category: 'tech' },
    ]
  },
  {
    id: 'process',
    title: '3. Processos e Organização',
    description: 'Avalia se os fluxos de trabalho estão claros.',
    questions: [
      { id: 'process_1', text: 'Os processos da empresa são bem definidos.', type: 'rating', category: 'process' },
      { id: 'process_2', text: 'Sei exatamente quais são minhas responsabilidades.', type: 'rating', category: 'process' },
      { id: 'process_3', text: 'Existe boa comunicação entre os setores.', type: 'rating', category: 'process' },
      { id: 'process_4', text: 'Os processos da empresa evitam retrabalho.', type: 'rating', category: 'process' },
      { id: 'process_5', text: 'Quando surgem problemas, os processos ajudam a resolvê-los.', type: 'rating', category: 'process' },
      { id: 'process_open', text: 'Qual processo interno mais atrapalha sua produtividade hoje?', type: 'open', category: 'process' },
    ]
  },
  {
    id: 'comm',
    title: '4. Comunicação e Integração entre Setores',
    description: 'Muito importante em empresas com logística, manutenção, comercial e administrativo.',
    questions: [
      { id: 'comm_1', text: 'Os setores trabalham de forma colaborativa.', type: 'rating', category: 'comm' },
      { id: 'comm_2', text: 'As informações importantes chegam até mim de forma clara.', type: 'rating', category: 'comm' },
      { id: 'comm_3', text: 'Existe transparência nas decisões da empresa.', type: 'rating', category: 'comm' },
      { id: 'comm_4', text: 'A comunicação entre liderança e equipe é eficiente.', type: 'rating', category: 'comm' },
      { id: 'comm_open', text: 'O que poderia melhorar na comunicação entre os setores?', type: 'open', category: 'comm' },
    ]
  },
  {
    id: 'lead',
    title: '5. Liderança',
    description: 'Avalia percepção dos líderes.',
    questions: [
      { id: 'lead_1', text: 'Meu líder demonstra respeito pela equipe.', type: 'rating', category: 'lead' },
      { id: 'lead_2', text: 'Meu líder está aberto a sugestões e ideias.', type: 'rating', category: 'lead' },
      { id: 'lead_3', text: 'Recebo feedbacks que ajudam no meu desenvolvimento.', type: 'rating', category: 'lead' },
      { id: 'lead_4', text: 'A liderança da empresa transmite confiança.', type: 'rating', category: 'lead' },
      { id: 'lead_5', text: 'Os líderes tomam decisões de forma justa.', type: 'rating', category: 'lead' },
      { id: 'lead_open', text: 'O que um bom líder deveria fazer mais na empresa?', type: 'open', category: 'lead' },
    ]
  },
  {
    id: 'innov',
    title: '6. Inovação e Melhoria Contínua',
    description: 'Se conecta diretamente com o papel do NIT.',
    questions: [
      { id: 'innov_1', text: 'A empresa incentiva novas ideias.', type: 'rating', category: 'innov' },
      { id: 'innov_2', text: 'Tenho liberdade para sugerir melhorias.', type: 'rating', category: 'innov' },
      { id: 'innov_3', text: 'A empresa busca constantemente melhorar processos.', type: 'rating', category: 'innov' },
      { id: 'innov_4', text: 'Vejo a empresa evoluindo em tecnologia e inovação.', type: 'rating', category: 'innov' },
      { id: 'innov_open', text: 'Que inovação você gostaria de ver na empresa?', type: 'open', category: 'innov' },
    ]
  },
  {
    id: 'sat',
    title: '7. Satisfação Geral',
    description: 'Avalia o sentimento geral do colaborador.',
    questions: [
      { id: 'sat_1', text: 'Tenho orgulho de trabalhar na empresa.', type: 'rating', category: 'sat' },
      { id: 'sat_2', text: 'A empresa oferece oportunidades de crescimento.', type: 'rating', category: 'sat' },
      { id: 'sat_3', text: 'Recomendaria a empresa como um bom lugar para trabalhar.', type: 'rating', category: 'sat' },
      { id: 'sat_open', text: 'O que a empresa deveria mudar para ser um lugar ainda melhor para trabalhar?', type: 'open', category: 'sat' },
    ]
  },
  {
    id: 'nit',
    title: '8. Pergunta Estratégica para o NIT',
    description: 'Foco em inteligência e tecnologia.',
    questions: [
      { id: 'nit_1', text: 'Se você pudesse resolver um problema da empresa com tecnologia, qual seria?', type: 'open', category: 'nit' },
    ]
  },
  {
    id: 'golden',
    title: '9. Perguntas de Ouro',
    description: 'Revelando os verdadeiros gargalos.',
    questions: [
      { id: 'gold_1', text: 'Qual tarefa você faz hoje que poderia deixar de existir?', type: 'open', category: 'golden' },
      { id: 'gold_2', text: 'Qual sistema mais te irrita?', type: 'open', category: 'golden' },
      { id: 'gold_3', text: 'Qual processo da empresa você acha que é perda de tempo?', type: 'open', category: 'golden' },
    ]
  }
];

export const RATING_LABELS = [
  '1️⃣ Discordo totalmente',
  '2️⃣ Discordo parcialmente',
  '3️⃣ Neutro',
  '4️⃣ Concordo parcialmente',
  '5️⃣ Concordo totalmente'
];
