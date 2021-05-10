module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'usuario',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      telefono: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      activo: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
    },
    {
      sequelize,
      tableName: 'usuario',
      schema: 'public',
      timestamps: false,
      underscored: true,
      indexes: [
        {
          name: 'usuario_pk',
          unique: true,
          fields: [{ name: 'id' }],
        },
      ],
    }
  );
};
