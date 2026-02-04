const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Carga las variables del .env

// 1. Importamos la conexión a la base de datos
const sequelize = require('./config/db');

// 2. IMPORTANTE: Importamos el modelo. 
// Sin esta línea, Sequelize no creará la tabla 'tasks' automáticamente.
const Task = require('./models/task'); 

// 3. Importamos las rutas
const taskRoutes = require('./routes/taskRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 3000;

// 4. Sincronización y arranque del servidor
// Usamos { alter: true } para que si haces cambios en el modelo, la tabla se actualice sola.
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Base de datos conectada y tabla "tasks" creada/verificada');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en: http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar con la base de datos:', error);
  });