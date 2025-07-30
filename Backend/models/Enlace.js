// Backend/models/Enlace.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Enlace = sequelize.define('Enlace', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titulo: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      isUrl: true,
    },
  },
  categoriaId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    // Esta relación se define formalmente en models/index.js
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    // Esta relación se define formalmente en models/index.js
  }
}, {
  tableName: 'enlaces',
  timestamps: true,
});

module.exports = Enlace;