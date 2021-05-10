module.exports = (db) => {
  db.mesa.belongsTo(db.restaurante, {
    as: 'restaurante',
    foreignKey: 'restaurante_id',
  });

  db.mesa.hasMany(db.reserva, {
    as: 'reserva',
    foreignKey: 'mesa_id',
  });
};
