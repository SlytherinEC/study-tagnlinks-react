// Backend/index.js 
require('dotenv').config(); // Cargar variables de entorno desde .env 

// 1. Importación de módulos
const express = require('express');
const cors = require('cors');

// 2. Inicializar la app de express
const app = express();

// 3. Middlewares globales
app.use(cors()); // Permitir peticiones desde otros orígenes (como React)
app.use(express.json()); // Permitir recibir JSON en las peticiones

// 4. Conexión a la base de datos
const sequelize = require('./config/database');
require('./models'); // Importa todos los modelos y asociaciones

sequelize.authenticate()
  .then(() => console.log('Conexión con la base de datos establecida'))
  .catch((error) => console.error('Error al conectar con la base de datos', error));
  
// 5. Rutas
const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes)

// ruta básica de prueba
app.get('/', (req, res) => {
  res.send('Servidor backend de TagNLink funcionando correctamente');
});

// 6. Arranque del servidor 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});