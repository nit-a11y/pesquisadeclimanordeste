import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function limparDados() {
  const dbPath = path.join(__dirname, 'database.sqlite');
  
  try {
    console.log('🧹 Limpando dados do banco de dados...');
    
    const db = await open({
      filename: dbPath,
      driver: sqlite3.Database
    });

    // Limpar todas as respostas
    const result = await db.run('DELETE FROM survey_responses');
    console.log(`✅ ${result.changes} respostas removidas com sucesso!`);

    // Resetar o contador auto increment
    await db.run('DELETE FROM sqlite_sequence WHERE name = "survey_responses"');
    console.log('✅ Contador de ID resetado!');

    // Verificar se está vazio
    const row = await db.get('SELECT COUNT(*) as count FROM survey_responses');
    console.log(`📊 Total de respostas no banco: ${row.count}`);

    console.log('🎉 Banco de dados limpo com sucesso!');
    
    await db.close();

  } catch (error) {
    console.error('❌ Erro ao limpar dados:', error);
  }
}

limparDados();
