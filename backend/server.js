const express = require("express");
const cors = require("cors");
const Database = require("better-sqlite3");

const app = express();
const PORT = 5000;

/* ======================
   Database setup
====================== */

const db = new Database("scores.db");

// Create table if it doesn't exist
db.prepare(`
  CREATE TABLE IF NOT EXISTS scores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    player_name TEXT NOT NULL,
    game TEXT NOT NULL,
    score INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`).run();

/* ======================
   Middleware
====================== */

app.use(cors({
  origin: [
    "https://christopherlinkjhg.github.io",
    "http://localhost:3000"
  ]
}));

app.use(express.json());

/* ======================
   Routes
====================== */

// Add a score
app.post("/api/scores", (req, res) => {
  const { playerName, game, score } = req.body;

  if (
    typeof playerName !== "string" ||
    typeof game !== "string" ||
    typeof score !== "number"
  ) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const stmt = db.prepare(`
    INSERT INTO scores (player_name, game, score)
    VALUES (?, ?, ?)
  `);

  stmt.run(playerName, game, score);

  res.json({ success: true });
});

// Get / search scores
app.get("/api/scores", (req, res) => {
  const { game, limit = 50 } = req.query;

  let rows;

  if (game) {
    rows = db.prepare(`
      SELECT player_name, game, score, created_at
      FROM scores
      WHERE game = ?
      ORDER BY score DESC
      LIMIT ?
    `).all(game, Number(limit));
  } else {
    rows = db.prepare(`
      SELECT player_name, game, score, created_at
      FROM scores
      ORDER BY created_at DESC
      LIMIT ?
    `).all(Number(limit));
  }

  res.json(rows);
});

/* ======================
   Start server
====================== */

app.listen(PORT, () => {
  console.log(`✅ API running at http://localhost:${PORT}`);
});
