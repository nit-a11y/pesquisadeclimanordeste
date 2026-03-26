import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function verificar() {
  const db = await open({
    filename: path.join(__dirname, 'database.sqlite'),
    driver: sqlite3.Database
  });

  const response7 = await db.get('SELECT * FROM survey_responses WHERE id = 7');
  const comments7 = JSON.parse(response7.comments);
  
  console.log('📝 Resposta #7 - Comentários por pergunta:');
  Object.entries(comments7).forEach(([question, comment]) => {
    console.log(`  ${question}: ${comment}`);
  });

  const totalComments = await db.get('SELECT COUNT(*) as count FROM survey_responses WHERE json_extract(comments, "$") != "{}"');
  console.log(`\n💬 Total de respostas com comentários: ${totalComments.count}`);

  await db.close();
}

verificar();
