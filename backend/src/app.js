const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Ahora las rutas son directas porque app.js está al mismo nivel que las carpetas
const sequelize = require('./config/db'); 
const taskRoutes = require('./routes/taskRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Configuración de rutas
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 3000;

// Sincronizar base de datos y arrancar
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Base de datos conectada y tablas listas');
    app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error('Error al conectar la base de datos:', err);
  });