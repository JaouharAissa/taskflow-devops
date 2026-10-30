const express = require('express');

const app = express();
app.use(express.json());

// In-memory storage (enough for this project)
const tasks = [];
let nextId = 1;

// Health check: used later by Docker, Kubernetes and monitoring
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// US1: create a task
app.post('/api/tasks', (req, res) => {
  const title = typeof req.body?.title === 'string' ? req.body.title.trim() : '';
  if (!title) {
    return res.status(400).json({ error: 'title is required' });
  }
  const task = { id: nextId++, title };
  tasks.push(task);
  return res.status(201).json(task);
});

module.exports = app;
