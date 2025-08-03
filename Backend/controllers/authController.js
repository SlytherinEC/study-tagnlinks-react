// Backend/controllers/authController.js

const bcrypt = require('bcrypt'); // ✅ Usamos el paquete oficial bcrypt
const jwt = require('jsonwebtoken');
const { Usuario } = require('../models'); // Sequelize ya importa todos los modelos desde index.js
const { generarToken } = require('../utils/token'); // Importamos la función para generar el token

// Función para registrar un nuevo usuario
exports.registrar = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validaciones básicas
    if (!email || !password) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    // Verificar si ya existe el usuario
    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ error: 'Ya existe un usuario con ese correo electrónico.' });
    }

    // Hashear la contraseña antes de guardarla
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Crear el usuario en la base de datos
    const nuevoUsuario = await Usuario.create({
      email,
      password: hashedPassword,
    });

    // Generar token JWT usando la función del archivo utils/token.js
    const token = generarToken(nuevoUsuario);

    res.status(201).json({
      message: 'Usuario registrado correctamente',
      user: {
        id: nuevoUsuario.id,
        email: nuevoUsuario.email,
      },
      token,
    });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ error: 'Error del servidor al registrar usuario.' });
  }
};

// Función para iniciar sesión
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validar campos
    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son obligatorios.' });
    }

    // Buscar el usuario por email
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(401).json({ error: 'Credenciales incorrectas.' });
    }

    // Comparar contraseñas
    const match = await bcrypt.compare(password, usuario.password);
    if (!match) {
      return res.status(401).json({ error: 'Credenciales incorrectas.' });
    }

    // Generaramos el token si es válido usando la función de utils/token.js
    const token = generarToken(usuario);

    res.json({
      message: 'Inicio de sesión exitoso',
      user: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
      },
      token,
    });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ error: 'Error del servidor al iniciar sesión.' });
  }
};