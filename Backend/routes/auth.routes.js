// Backend/routes/auth.routes.js

const express = require('express');
const router = express.Router();

// Importamos el controlador de autenticación
const authController = require('../controllers/authController');

// Ruta para registrar un nuevo usuario
// Se espera recibir: { nombre, email, password }
router.post('/register', authController.registrar);

// Ruta para iniciar sesión
// Se espera recibir: { email, password }
router.post('/login', authController.login);

// Exportamos el enrutador para usarlo en index.js
module.exports = router;