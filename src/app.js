const express = require('express');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const storeRoutes = require('./routes/storeRoutes');
const createTables = require('./database/createTables');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/stores', storeRoutes);

// Crear las tablas si no existen
createTables();

// Iniciar el servidor
const PORT = process.env.PORT ?? 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
});
