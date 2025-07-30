// Backend/index.js 

// 1. Importación de módulos
const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Cargar variables de entorno desde .env 

// 2. Inicializar la app de express
const app = express();

// 3. Middlewares globales
app.use(cors()); // Permitir peticiones desde otros orígenes (como React)
app.use(express.json()); // Permitir recibir JSON en las peticiones

// 4. Ruta de prueba básica
app.get('/', (req, res) => {
  res.send('Servidor backend de TagNLink funcionando correctamente');
});

// 5. Puerto de escucha
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});