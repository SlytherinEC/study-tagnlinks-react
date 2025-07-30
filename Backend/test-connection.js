// Backend/test-connection.js
const sequelize = require('./config/database');

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión establecida correctamente con MySQL.');
  } catch (error) {
    console.error('❌ No se pudo conectar a la base de datos:', error);
  } finally {
    await sequelize.close();
  }
}

testConnection();