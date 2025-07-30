// Backend/controllers/authController.js

const bcrypt = require('bcryptjs');
const { Usuario } = require('../models');
const { generarToken } = require('../utils/token');

exports.registrarUsuario = async (req, res) => {
  const { nombre, email, password } = req.body;

  try {
    // Validar que no exista ya un usuario con ese email
    const existeUsuario = await Usuario.findOne({ where: { email } });
    if (existeUsuario) {
      return res.status(400).json({ mensaje: 'El email ya está registrado' });
    }

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const nuevoUsuario = await Usuario.create({
      nombre,
      email,
      password: hashedPassword
    });

    // Generar token
    const token = generarToken(nuevoUsuario);

    res.status(201).json({
      mensaje: 'Usuario registrado correctamente',
      token
    });

  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};