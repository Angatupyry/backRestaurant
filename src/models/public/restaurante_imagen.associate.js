module.exports = (db) => {
  db.restaurante_imagen.belongsTo(db.restaurante, {
    as: 'restaurante',
    foreignKey: 'restaurante_id',
  });
};
