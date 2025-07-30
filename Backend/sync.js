// Backend/sync.js

const sequelize = require('./config/database');
const { Usuario, Enlace, Categoria } = require('./models');

async function syncDatabase() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión con la base de datos establecida con éxito.');

    // Sincroniza todos los modelos
    await sequelize.sync({ alter: true });
    console.log('✅ Modelos sincronizados correctamente con la base de datos.');

    process.exit(); // Termina el proceso
  } catch (error) {
    console.error('❌ Error al conectar o sincronizar:', error);
    process.exit(1);
  }
}

syncDatabase();