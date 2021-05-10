module.exports = (db) => {
  db.usuario.hasMany(db.comentario, {
    as: 'comentario',
    foreignKey: 'usuario_id',
  });
};
