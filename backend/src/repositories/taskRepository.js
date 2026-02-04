const Task = require('../models/Task');

class TaskRepository {
  async findAll() {
    return await Task.findAll();
  }

  async findById(id) {
    return await Task.findByPk(id);
  }

  async create(data) {
    return await Task.create(data);
  }

  async update(id, data) {
    const task = await Task.findByPk(id);
    if (!task) return null;
    return await task.update(data);
  }

  async delete(id) {
    const task = await Task.findByPk(id);
    if (!task) return null;
    return await task.destroy();
  }
}

module.exports = new TaskRepository(); // <--- VITAL
