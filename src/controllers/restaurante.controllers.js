/* eslint-disable no-await-in-loop */
const BinaryParser = require('binary-buffer-parser');
const { comentario, restaurante, restaurante_imagen } = require('../models');

function base64_encode(bitmap) {
  return new Buffer(bitmap).toString('base64');
}

const getImagen = async (restaurante_id) => {
  try {
    const imagen = await restaurante_imagen.findAll({
      where: {
        restaurante_id,
        menu: false,
      },
      raw: true,
    });
    if (!imagen.length) return null;

    const bufferParser = new BinaryParser(imagen[0].imagen).int64();
    const algo = base64_encode(bufferParser);

    return algo;
  } catch (error) {
    throw new Error(error);
  }
};

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
        imagen: await getImagen(restaurant[i].id),
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
