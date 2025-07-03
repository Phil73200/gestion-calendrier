const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('../calendar.db');

app.get('/api/candidatures', (req, res) => {
  db.all('SELECT * FROM candidatures', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.get('/api/courses_validees', (req, res) => {
  db.all(`
    SELECT v.date_validee AS date, v.lieu_valide AS lieu, c.club, c.comite, c.type_course, c.categorie
    FROM courses_validees v
    JOIN candidatures c ON v.id_candidature = c.id
    ORDER BY v.date_validee ASC`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/validate/:id', (req, res) => {
  const { id } = req.params;
  db.run(`INSERT INTO courses_validees (id_candidature, date_validee, lieu_valide, statut)
          SELECT id, date_souhaitee, lieu_souhaite, 'active' FROM candidatures WHERE id = ?`, [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));