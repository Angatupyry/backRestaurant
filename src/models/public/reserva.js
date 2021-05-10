module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'reserva',
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
      mesa_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'mesa',
          key: 'id',
        },
      },
      usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'usuario',
          key: 'id',
        },
      },
      fecha_desde: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      fecha_hasta: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'reserva',
      schema: 'public',
      timestamps: false,
      underscored: true,
      indexes: [
        {
          name: 'reserva_pk',
          unique: true,
          fields: [{ name: 'id' }],
        },
      ],
    }
  );
};
