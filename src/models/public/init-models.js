/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line prefer-destructuring
const DataTypes = require('sequelize').DataTypes;
const _comentario = require('./comentario');
const _mesa = require('./mesa');
const _reserva = require('./reserva');
const _restaurante = require('./restaurante');
const _restaurante_imagen = require('./restaurante_imagen');
const _usuario = require('./usuario');

function initModels(sequelize) {
  const comentario = _comentario(sequelize, DataTypes);
  const mesa = _mesa(sequelize, DataTypes);
  const reserva = _reserva(sequelize, DataTypes);
  const restaurante = _restaurante(sequelize, DataTypes);
  const restaurante_imagen = _restaurante_imagen(sequelize, DataTypes);
  const usuario = _usuario(sequelize, DataTypes);

  reserva.belongsTo(mesa, { as: 'mesa', foreignKey: 'mesa_id' });
  mesa.hasMany(reserva, { as: 'reservas', foreignKey: 'mesa_id' });
  comentario.belongsTo(restaurante, { as: 'restaurante', foreignKey: 'restaurante_id' });
  restaurante.hasMany(comentario, { as: 'comentarios', foreignKey: 'restaurante_id' });
  mesa.belongsTo(restaurante, { as: 'restaurante', foreignKey: 'restaurante_id' });
  restaurante.hasMany(mesa, { as: 'mesas', foreignKey: 'restaurante_id' });
  reserva.belongsTo(restaurante, { as: 'restaurante', foreignKey: 'restaurante_id' });
  restaurante.hasMany(reserva, { as: 'reservas', foreignKey: 'restaurante_id' });
  restaurante_imagen.belongsTo(restaurante, { as: 'restaurante', foreignKey: 'restaurante_id' });
  restaurante.hasMany(restaurante_imagen, {
    as: 'restaurante_imagens',
    foreignKey: 'restaurante_id',
  });
  comentario.belongsTo(usuario, { as: 'usuario', foreignKey: 'usuario_id' });
  usuario.hasMany(comentario, { as: 'comentarios', foreignKey: 'usuario_id' });
  reserva.belongsTo(usuario, { as: 'usuario', foreignKey: 'usuario_id' });
  usuario.hasMany(reserva, { as: 'reservas', foreignKey: 'usuario_id' });

  return {
    comentario,
    mesa,
    reserva,
    restaurante,
    restaurante_imagen,
    usuario,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
