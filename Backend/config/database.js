// Backend/config/database.js

// 1. Importamos Sequelize desde el paquete
const { Sequelize } = require('sequelize');

// 2. Cargamos las variables de entorno desde el archivo .env
require('dotenv').config();

// 3. Creamos una instancia de Sequelize con la configuracion
const sequelize = new Sequelize(
  process.env.DB_NAME, // Nombre de la base de datos
  process.env.DB_USER, // Usuario
  process.env.DB_PASSWORD, // Contraseña
  {
    host: process.env.DB_HOST, // Host (IP o nombre del contenedor Docker)
    port: process.env.DB_PORT, // Puerto (3306 por defecto en MySQL)
    dialect: 'mysql', // Tipo de base de datos
    logging: false, // Desactiva logs SQL en consola
  }
);

// 4. Exportamos la instancia para usarla en modelos y controladores
module.exports = sequelize;

// A partir de ahora todos los modelos (Usuario, Enlace, Categoría...) van a importar la instancia de Sequelize desde config/database.js