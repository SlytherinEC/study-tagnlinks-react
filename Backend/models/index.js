// Backend/models/index.js
// la clave foreignKey: indica qué campo de la tabla funciona como clave foránea
/** la clave as: le da un alias a la relación. Este alias es el que se usa cuando haga consultas usando .include()
  ej:
  const usuario = await Usuario.findByPk(1, {
    include: ['enlaces', 'categorias']
  });
*/

const Usuario = require('./Usuario');
const Enlace = require('./Enlace');
const Categoria = require('./Categoria');

// Relaciones Usuario ↔ Enlace
// un usuario tiene muchos enlaces
Usuario.hasMany(Enlace, {
  foreignKey: 'usuarioId',
  as: 'enlaces'
});

// un enlace pertenece a un usuario 
Enlace.belongsTo(Usuario, {
  foreignKey: 'usuarioId',
  as: 'usuario'
});

// Relaciones Usuario ↔ Categoria
// un usuario tiene muchas categorias
Usuario.hasMany(Categoria, {
  foreignKey: 'usuarioId',
  as: 'categorias'
});

// una categoría pertenece a un usuario
Categoria.belongsTo(Usuario, {
  foreignKey: 'usuarioId',
  as: 'usuario'
});

// Relaciones Categoria ↔ Enlace
// Una categoría tiene muchos enlaces
Categoria.hasMany(Enlace, {
  foreignKey: 'categoriaId',
  as: 'enlaces'
});

// Un enlace pertenece a una categoría
Enlace.belongsTo(Categoria, {
  foreignKey: 'categoriaId',
  as: 'categoria'
});

module.exports = {
  Usuario,
  Enlace,
  Categoria
};