const taskRepository = require('../repositories/taskRepository');

class TaskService {
  async getAllTasks() {
    return await taskRepository.findAll();
  }

  async getTaskById(id) {
    const task = await taskRepository.findById(id);
    if (!task) throw { status: 404, message: "Task not found" };
    return task;
  }

  async createTask(data) {
    this.validateTaskRule(data);
    return await taskRepository.create(data);
  }

  async updateTask(id, data) {
    this.validateTaskRule(data);
    const updatedTask = await taskRepository.update(id, data);
    if (!updatedTask) throw { status: 404, message: "Task not found" };
    return updatedTask;
  }

  async deleteTask(id) {
    const deleted = await taskRepository.delete(id);
    if (!deleted) throw { status: 404, message: "Task not found" };
    return { message: "Task deleted successfully" };
  }

  // REGLA OBLIGATORIA DEL EXAMEN
  validateTaskRule(data) {
    if (data.status === 'DONE') {
      if (!data.description || data.description.length < 10) {
        throw { status: 400, message: "No se permite marcar como DONE si la descripción tiene menos de 10 caracteres" };
      }
    }
  }
}

module.exports = new TaskService(); // <--- VITAL