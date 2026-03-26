import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';
import { randomInt } from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Comentários variados para usar nas respostas
const COMENTARIOS = [
  "A empresa poderia investir mais em treinamentos.",
  "Gosto de trabalhar aqui, mas a comunicação poderia melhorar.",
  "Excelente ambiente de trabalho!",
  "Precisamos de mais equipamentos adequados.",
  "A liderança é muito prestativa.",
  "Bom ambiente, mas falta reconhecimento.",
  "Processos bem organizados.",
  "Poderíamos ter mais eventos de integração.",
  "A empresa se preocupa com os funcionários.",
  "Felicidade em fazer parte da equipe Nordeste Locações.",
  "Reconhecimento é algo que precisa melhorar.",
  "Ótimos benefícios oferecidos.",
  "A comunicação entre setores é eficiente.",
  "Liderança exemplar, sempre disposta a ajudar.",
  "Ambiente físico precisa de melhorias.",
  "Sinto que sou valorizado na empresa.",
  "Excelente relação com os colegas.",
  "A empresa investe no nosso desenvolvimento.",
  "Bom equilíbrio entre vida profissional e pessoal.",
  "Processos poderiam ser mais ágeis.",
  "A cultura da empresa é muito positiva.",
  "Recebo feedbacks construtivos regularmente.",
  "A autonomia concedida é ótima.",
  "Podemos melhorar a celebração de metas.",
  "Trabalho com orgulho na Nordeste Locações.",
  "A empresa trata todos com respeito.",
  "Falta mais clareza nas comunicações internas.",
  "A liderança é transparente em suas decisões.",
  "Excelente espírito de equipe.",
  "A remuneração é competitiva."
];

// Unidades para distribuição
const UNIDADES = ['EUSÉBIO', 'FORTALEZA', 'SÃO LUÍS', 'JUAZEIRO DO NORTE'];

// Comentários específicos por categoria
const COMENTARIOS_ESPECIFICOS = {
  ambiente_trabalho: [
    "O ambiente físico é excelente, muito bem cuidado.",
    "Precisamos de mais recursos para trabalhar melhor.",
    "O clima organizacional é muito positivo."
  ],
  comprometimento: [
    "Me sinto muito engajado com os objetivos da empresa.",
    "Tenho orgulho de fazer parte da Nordeste Locações.",
    "O trabalho aqui tem um propósito especial para mim."
  ],
  comunicacao: [
    "Os canais de comunicação funcionam bem.",
    "Minhas sugestões são sempre ouvidas.",
    "A liderança mantém todos bem informados."
  ],
  gestao_capital: [
    "Excelentes oportunidades de desenvolvimento.",
    "A empresa reconhece o bom trabalho.",
    "Ótimo pacote de benefícios.",
    "Tratamento igualitário para todos.",
    "Bem-vindo aos novos funcionários.",
    "Equilíbrio vida profissional/pessoal respeitado.",
    "Sem discriminação, ambiente inclusivo.",
    "Celebração de metas sempre acontece.",
    "Sinto-me valorizado aqui.",
    "Pouca rivalidade interna.",
    "Pretendo ficar muitos anos aqui.",
    "Bom relacionamento entre áreas.",
    "Excelente lugar para trabalhar."
  ],
  lideranca: [
    "Líder claro nas expectativas.",
    "Liderança ética e comprometida.",
    "Líder se importa com as pessoas.",
    "Fácil comunicação com o líder.",
    "Líder investe no desenvolvimento.",
    "Erros vistos como aprendizado.",
    "Líder ouve e age nas sugestões.",
    "Visão clara do futuro.",
    "Autonomia bem concedida.",
    "Líder envolve nas decisões.",
    "Tratamento igualitário do líder.",
    "Boa coordenação de tarefas.",
    "Líder coerente (fala o que faz).",
    "Feedbacks construtivos sempre."
  ],
  trabalho_equipe: [
    "Ótima colaboração entre todos.",
    "As pessoas se importam genuinamente.",
    "Forte sentimento de equipe.",
    "Pouca politicagem interna."
  ]
};

async function gerarMock() {
  const dbPath = path.join(__dirname, 'database.sqlite');
  
  try {
    console.log('🎲 Gerando 80 respostas mock com unidades...');
    
    const db = await open({
      filename: dbPath,
      driver: sqlite3.Database
    });

    // Gerar 80 respostas (20 por unidade aproximadamente)
    for (let i = 1; i <= 80; i++) {
      const timestamp = new Date(Date.now() - randomInt(0, 30 * 24 * 60 * 60 * 1000)).toISOString();
      const answers = {};
      const comments = {};

      // Distribuir unidades (balanceado)
      const unidadeIndex = (i - 1) % UNIDADES.length;
      const unidade = UNIDADES[unidadeIndex];

      // Gerar respostas para todas as perguntas (incluindo a nova pergunta unidade)
      const questions = [
        'unidade', // Nova pergunta de unidade
        'amb_1', 'amb_2', 'amb_3',
        'comp_1', 'comp_2', 'comp_3', 'comp_4',
        'com_1', 'com_2', 'com_3',
        'gch_1', 'gch_2', 'gch_3', 'gch_4', 'gch_5', 'gch_6', 'gch_7', 'gch_8', 'gch_9', 'gch_10', 'gch_11', 'gch_12', 'gch_13', 'gch_14', 'gch_15', 'gch_16',
        'lid_1', 'lid_2', 'lid_3', 'lid_4', 'lid_5', 'lid_6', 'lid_7', 'lid_8', 'lid_9', 'lid_10', 'lid_11', 'lid_12', 'lid_13', 'lid_14', 'lid_15',
        'eq_1', 'eq_2', 'eq_3', 'eq_4'
      ];

      // Uma resposta específica (a #7) terá comentários em TODAS as perguntas
      const isAllCommentsResponse = (i === 7);
      
      // Algumas respostas terão comentários aleatórios (cerca de 20%)
      const shouldHaveRandomComments = !isAllCommentsResponse && randomInt(1, 100) <= 20;

      questions.forEach(questionId => {
        if (questionId === 'unidade') {
          // Pergunta de unidade sempre com a unidade distribuída
          answers[questionId] = unidade;
        } else {
          // Gerar nota aleatória (1-5), com tendência para notas mais altas
          const rand = randomInt(1, 100);
          let rating;
          if (rand <= 5) rating = 1;      // 5% nota 1
          else if (rand <= 15) rating = 2; // 10% nota 2  
          else if (rand <= 35) rating = 3; // 20% nota 3
          else if (rand <= 70) rating = 4; // 35% nota 4
          else rating = 5;                 // 30% nota 5

          answers[questionId] = rating;

          // Adicionar comentários se for a resposta especial ou se tiver comentários aleatórios
          if (isAllCommentsResponse || shouldHaveRandomComments) {
            // Extrair categoria do ID da pergunta
            let category = '';
            if (questionId.startsWith('amb_')) category = 'ambiente_trabalho';
            else if (questionId.startsWith('comp_')) category = 'comprometimento';
            else if (questionId.startsWith('com_')) category = 'comunicacao';
            else if (questionId.startsWith('gch_')) category = 'gestao_capital';
            else if (questionId.startsWith('lid_')) category = 'lideranca';
            else if (questionId.startsWith('eq_')) category = 'trabalho_equipe';

            if (isAllCommentsResponse) {
              // Para a resposta #7, usar comentários específicos da categoria
              const categoryComments = COMENTARIOS_ESPECIFICOS[category] || COMENTARIOS;
              comments[questionId] = categoryComments[randomInt(0, categoryComments.length)];
            } else {
              // Para comentários aleatórios, usar comentários gerais
              comments[questionId] = COMENTARIOS[randomInt(0, COMENTARIOS.length)];
            }
          }
        }
      });

      // Inserir no banco com unidade
      await db.run(
        'INSERT INTO survey_responses (timestamp, answers, comments, unidade) VALUES (?, ?, ?, ?)',
        [timestamp, JSON.stringify(answers), JSON.stringify(comments), unidade]
      );

      if (i % 10 === 0) {
        console.log(`✅ Geradas ${i} respostas...`);
      }
    }

    // Verificar total e distribuição
    const row = await db.get('SELECT COUNT(*) as count FROM survey_responses');
    console.log(`📊 Total de respostas no banco: ${row.count}`);
    
    // Mostrar distribuição por unidade
    for (const unidade of UNIDADES) {
      const countRow = await db.get('SELECT COUNT(*) as count FROM survey_responses WHERE unidade = ?', [unidade]);
      console.log(`📍 ${unidade}: ${countRow.count} respostas`);
    }
    
    console.log('🎉 Mock gerado com sucesso!');
    console.log('📝 Resposta #7 tem comentários em TODAS as perguntas');
    console.log('💬 Cerca de 20% das respostas têm comentários aleatórios');
    console.log('🏢 Distribuição balanceada por unidade (20 cada)');
    
    await db.close();

  } catch (error) {
    console.error('❌ Erro ao gerar mock:', error);
  }
}

gerarMock();
