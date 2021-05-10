const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'restaurante_imagen',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      restaurante_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'restaurante',
          key: 'id',
        },
      },
      imagen: {
        type: Sequelize.BLOB('tiny'),
        allowNull: true,
      },
      menu: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'restaurante_imagen',
      schema: 'public',
      timestamps: false,
      underscored: true,
      indexes: [
        {
          name: 'restaurante_imagen_pk',
          unique: true,
          fields: [{ name: 'id' }],
        },
      ],
    }
  );
};
