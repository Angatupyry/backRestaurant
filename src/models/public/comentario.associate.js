module.exports = (db) => {
  db.comentario.belongsTo(db.usuario, {
    as: 'usuario',
    foreignKey: 'usuario_id',
  });

  db.comentario.belongsTo(db.restaurante, {
    as: 'restaurante',
    foreignKey: 'restaurante_id',
  });
};
