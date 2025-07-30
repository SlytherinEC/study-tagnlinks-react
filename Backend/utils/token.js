// Backend/utils/token.js

const jwt = require('jsonwebtoken');

const generarToken = (usuario) => {
  return jwt.sign(
    {
      id: usuario.id,
      email: usuario.email
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1h'
    }
  );
};

module.exports = { generarToken };