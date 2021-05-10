module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'restaurante',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      hora_apertura: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      hora_cierre: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      horas_maxima_por_mesa: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'restaurante',
      schema: 'public',
      timestamps: false,
      underscored: true,
      indexes: [
        {
          name: 'restaurante_pk',
          unique: true,
          fields: [{ name: 'id' }],
        },
      ],
    }
  );
};
