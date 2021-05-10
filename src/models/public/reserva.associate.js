module.exports = (db) => {
  db.reserva.belongsTo(db.usuario, {
    as: 'usuario',
    foreignKey: 'usuario_id',
  });

  db.reserva.belongsTo(db.restaurante, {
    as: 'restaurante',
    foreignKey: 'restaurante_id',
  });

  db.reserva.belongsTo(db.mesa, {
    as: 'mesa',
    foreignKey: 'mesa_id',
  });
};
