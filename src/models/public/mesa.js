module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'mesa',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      numero: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      restaurante_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'restaurante',
          key: 'id',
        },
      },
      cant_personas: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      disponible: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      tableName: 'mesa',
      schema: 'public',
      timestamps: false,
      underscored: true,
      indexes: [
        {
          name: 'mesa_pk',
          unique: true,
          fields: [{ name: 'id' }],
        },
      ],
    }
  );
};
