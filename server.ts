import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3001;

  // Initialize SQLite
  const db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  });

  // Create table if not exists
  await db.exec(`
    CREATE TABLE IF NOT EXISTS survey_responses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      timestamp TEXT NOT NULL,
      answers TEXT NOT NULL,
      comments TEXT NOT NULL,
      unidade TEXT
    )
  `);

  // Add unidade column if not exists (for existing databases)
  try {
    await db.exec(`ALTER TABLE survey_responses ADD COLUMN unidade TEXT`);
  } catch (error) {
    // Column already exists - ignore error
    console.log('Column unidade already exists or added successfully');
  }

  app.use(express.json());

  // API Routes
  app.get('/api/responses', async (req, res) => {
    try {
      const { unidade } = req.query;
      let query = 'SELECT * FROM survey_responses';
      let params = [];
      
      if (unidade && unidade !== 'all') {
        query += ' WHERE unidade = ?';
        params.push(unidade);
      }
      
      query += ' ORDER BY timestamp DESC';
      
      const rows = await db.all(query, params);
      const responses = rows.map(row => ({
        ...row,
        answers: JSON.parse(row.answers),
        comments: JSON.parse(row.comments)
      }));
      res.json(responses);
    } catch (error) {
      console.error('Error fetching responses:', error);
      res.status(500).json({ error: 'Failed to fetch responses' });
    }
  });

  // Get unique units for filter
  app.get('/api/unidades', async (req, res) => {
    try {
      const rows = await db.all('SELECT DISTINCT unidade FROM survey_responses WHERE unidade IS NOT NULL ORDER BY unidade');
      const unidades = rows.map(row => row.unidade);
      res.json(unidades);
    } catch (error) {
      console.error('Error fetching unidades:', error);
      res.status(500).json({ error: 'Failed to fetch unidades' });
    }
  });

  app.post('/api/responses', async (req, res) => {
    try {
      const { timestamp, answers, comments, unidade } = req.body;
      await db.run(
        'INSERT INTO survey_responses (timestamp, answers, comments, unidade) VALUES (?, ?, ?, ?)',
        [timestamp, JSON.stringify(answers), JSON.stringify(comments), unidade || null]
      );
      res.status(201).json({ success: true });
    } catch (error) {
      console.error('Error saving response:', error);
      res.status(500).json({ error: 'Failed to save response' });
    }
  });

  app.delete('/api/responses', async (req, res) => {
    try {
      await db.run('DELETE FROM survey_responses');
      res.json({ success: true });
    } catch (error) {
      console.error('Error clearing responses:', error);
      res.status(500).json({ error: 'Failed to clear responses' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
