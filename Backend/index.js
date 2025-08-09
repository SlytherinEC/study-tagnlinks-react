// Backend/index.js

// 1. Cargar variables de entorno desde .env
require('dotenv').config();

// 2. Importación de módulos
const express = require('express');
const cors = require('cors');

// 3. Inicialización de la app
const app = express();

// 4. Middlewares globales
app.use(cors());               // Habilita CORS para permitir peticiones desde el frontend
app.use(express.json());       // Habilita parsing de JSON en las peticiones

// 5. Conexión a la base de datos
const sequelize = require('./config/database');
require('./models');           // Importa todos los modelos y asociaciones

sequelize.authenticate()
  .then(() => console.log('✅ Conexión a la base de datos establecida.'))
  .catch((error) => console.error('❌ Error al conectar con la base de datos:', error));

// 6. Rutas
const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);

// 7. Ruta básica de prueba
app.get('/', (req, res) => {
  res.send('Servidor backend de TagNLink funcionando correctamente');
});

// 8. Arranque del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});