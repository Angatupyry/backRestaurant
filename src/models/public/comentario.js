module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'comentario',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'usuario',
          key: 'id',
        },
      },
      restaurante_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'restaurante',
          key: 'id',
        },
      },
      mensaje: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      puntuacion: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'comentario',
      schema: 'public',
      timestamps: false,
      underscored: true,
      indexes: [
        {
          name: 'comentario_pk',
          unique: true,
          fields: [{ name: 'id' }],
        },
      ],
    }
  );
};
