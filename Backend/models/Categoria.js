// Backend/models/Categoria.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Categoria = sequelize.define('Categoria', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    // Se define formalmente en models/index.js
  }
}, {
  tableName: 'categorias',
  timestamps: true,
});

module.exports = Categoria;