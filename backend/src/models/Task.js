const { DataTypes } = require('sequelize');
// IMPORTANTE: Sin llaves { }. 
const dbInstance = require('../config/db'); 

// Esta línea nos dirá la verdad en la consola:
console.log('DEPURACIÓN: ¿Qué es dbInstance?', typeof dbInstance.define === 'function' ? 'Es una instancia válida' : '¡ERROR: No es una instancia!');

const Task = dbInstance.define('Task', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { 
    type: DataTypes.STRING, 
    allowNull: false,
    validate: { len: [3, 255] } 
  },
  description: { type: DataTypes.STRING, allowNull: true },
  status: { 
    type: DataTypes.STRING, 
    allowNull: false,
    validate: { isIn: [['PENDING', 'IN_PROGRESS', 'DONE']] }
  }
}, { 
  tableName: 'tasks',
  timestamps: true 
});

module.exports = Task;