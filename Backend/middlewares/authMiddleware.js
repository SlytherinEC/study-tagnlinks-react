// Backend/middlewares/authMiddleware.js

const jwt = require('jsonwebtoken');

// Middleware para verificar si el usuario está autenticado
module.exports = (req, res, next) => {
  // Extraemos el token del header Authorization
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado.' });
  }

  try {
    // Verificamos el token usando la clave secreta del .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Guardamos la info del usuario dentro de la request
    req.user = decoded;

    // Continuamos con la ejecución de la ruta
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido o expirado.' });
  }
};