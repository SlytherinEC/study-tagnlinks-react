// Backend/sync.js

const sequelize = require('./config/database');
const Usuario = require('./models/Usuario');
const Enlace = require('./models/Enlace');
const Categoria = require('./models/Categoria')

async function syncModels() {
  try {
    await sequelize.sync({ alter: true }); // Crea o actualiza las tablas
    console.log('✅ Modelos sincronizados con la base de datos.');
  } catch (error) {
    console.error('❌ Error al sincronizar modelos:', error);
  } finally {
    await sequelize.close();
  }
}

syncModels();