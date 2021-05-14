/* eslint-disable no-await-in-loop */
const { comentario, restaurante } = require('../models');

const promedioPuntuacion = async (restaurante_id) => {
  try {
    const comentarios = await comentario.findAll({
      where: {
        restaurante_id,
      },
      raw: true,
    });

    let suma = 0;

    for (let i = 0; i < comentarios.length; i++) {
      suma += comentarios[i].puntuacion;
    }

    return suma / comentarios.length;
  } catch (error) {
    throw new Error(error);
  }
};

const getList = async (req, res, next) => {
  try {
    const data = [];
    const restaurant = await restaurante.findAll();

    for (let i = 0; i < restaurant.length; i++) {
      data.push({
        id: restaurant[i].id,
        nombre: restaurant[i].nombre,
        descripcion: restaurant[i].descripcion,
        promedioPuntacion: await promedioPuntuacion(restaurant[i].id),
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Éxito',
      data,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getList,
};
