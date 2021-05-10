module.exports = (db) => {
  db.restaurante.hasMany(db.comentario, {
    as: 'comentario',
    foreignKey: 'restaurante_id',
  });

  db.restaurante.hasMany(db.mesa, {
    as: 'mesa',
    foreignKey: 'restaurante_id',
  });

  db.restaurante.hasMany(db.reserva, {
    as: 'reserva',
    foreignKey: 'restaurante_id',
  });

  db.restaurante.hasMany(db.restaurante_imagen, {
    as: 'restaurante_imagen',
    foreignKey: 'restaurante_id',
  });
};
