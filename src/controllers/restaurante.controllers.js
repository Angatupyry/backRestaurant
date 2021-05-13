const { comentario } = require('../models');

const promedioPuntuacion = (array) => {
  try {
    let suma = 0;

    for (let i = 0; i < array.length; i++) {
      suma += array[i].puntuacion;
    }

    return suma / array.length;
  } catch (error) {
    throw new Error(error);
  }
};

const getComentariosPorRestaurante = async (req, res, next) => {
  try {
    let result = {};
    const comentariosPorRestaurante = await comentario.findAll({
      where: {
        restaurante_id: req.params.restaurante_id,
      },
      raw: true,
    });

    const promedio = promedioPuntuacion(comentariosPorRestaurante, 'puntuacion');

    return res.status(200).json({
      success: true,
      data: comentariosPorRestaurante,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getComentariosPorRestaurante,
};
