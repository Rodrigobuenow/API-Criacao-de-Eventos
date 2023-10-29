const express = require("express");
const app = express();
const port = 3000;
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("eventos.db");

app.use(express.json());

db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS eventos (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, data_referencia TEXT)"
  );
});

app.get("/eventos", (req, res) => {
  db.all("SELECT * FROM eventos", (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao buscar eventos" });
    }
    res.json(rows);
  });
});

app.post("/eventos", (req, res) => {
  const { nome, data_referencia } = req.body;

  db.run(
    "INSERT INTO eventos (nome, data_referencia) VALUES (?, ?)",
    [nome, data_referencia],
    function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro ao criar evento" });
      }
      res.status(201).json({ nome, data_referencia, id: this.lastID });
    }
  );
});

app.delete("/eventos/:nome", (req, res) => {
  const nome = req.params.nome;

  const dataAtual = new Date();

  db.get(
    "SELECT data_referencia FROM eventos WHERE nome = ?",
    nome,
    (err, row) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro ao excluir evento" });
      }
      if (!row) {
        return res.status(404).json({ error: "Evento não encontrado" });
      }
      const dataEvento = new Date(row.data_referencia);

      if (dataEvento > dataAtual) {
        db.run("DELETE FROM eventos WHERE nome = ?", nome, function (err) {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: "Erro ao excluir evento" });
          }
          res.status(204).end();
        });
      } else {
          .status(400)
          .json({ error: "Evento já aconteceu e não pode ser excluído" });
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
