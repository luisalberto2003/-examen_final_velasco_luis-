const express = require('express');
const router = express.Router();
const taskService = require('../services/taskService');

router.get('/', async (req, res) => {
  const tasks = await taskService.getAllTasks();
  res.json(tasks);
});

router.get('/:id', async (req, res) => {
  try {
    const task = await taskService.getTaskById(req.params.id);
    res.json(task);
  } catch (err) { res.status(err.status || 500).json({ message: err.message }); }
});

router.post('/', async (req, res) => {
  try {
    const newTask = await taskService.createTask(req.body);
    res.status(201).json(newTask);
  } catch (err) { res.status(err.status || 400).json({ message: err.message }); }
});

router.put('/:id', async (req, res) => {
  try {
    const updated = await taskService.updateTask(req.params.id, req.body);
    res.json(updated);
  } catch (err) { res.status(err.status || 400).json({ message: err.message }); }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await taskService.deleteTask(req.params.id);
    res.json(result);
  } catch (err) { res.status(err.status || 404).json({ message: err.message }); }
});

module.exports = router;