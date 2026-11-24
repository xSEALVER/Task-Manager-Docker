const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());          // autorise les appels venant d'un autre port (le front)
app.use(express.json());  // permet de lire le JSON envoyé dans req.body

let tasks = [];           // stockage temporaire : tout est perdu au redémarrage
let nextId = 1;

// READ : liste toutes les tâches
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// CREATE : ajoute une tâche
app.post('/tasks', (req, res) => {
  const task = { id: nextId++, title: req.body.title, done: false };
  tasks.push(task);
  res.status(201).json(task); // 201 = "créé"
});

// UPDATE : modifie une tâche
app.put('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === Number(req.params.id));
  if (!task) return res.status(404).json({ error: 'Tâche introuvable' });
  if (req.body.title !== undefined) task.title = req.body.title;
  if (req.body.done !== undefined) task.done = req.body.done;
  res.json(task);
});

// DELETE : supprime une tâche
app.delete('/tasks/:id', (req, res) => {
  tasks = tasks.filter(t => t.id !== Number(req.params.id));
  res.status(204).end(); // 204 = "ok, rien à renvoyer"
});

app.listen(3000, () => console.log('API sur le port 3000'));