/* eslint-disable no-await-in-loop */
const BinaryParser = require('binary-buffer-parser');
const moment = require('moment');
const {
  comentario,
  restaurante,
  restaurante_imagen,
  usuario,
  mesa,
  reserva,
} = require('../models');

function base64_encode(bitmap) {
  // eslint-disable-next-line no-buffer-constructor
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

const getListDetails = async (req, res, next) => {
  try {
    const restaurant = await restaurante.findAll({
      where: { id: req.params.id },
      include: [
        {
          model: mesa,
          as: 'mesa',
          attributes: { exclude: ['restaurante_id'] },
        },
        {
          model: comentario,
          as: 'comentario',
          attributes: { exclude: ['usuario_id', 'restaurante_id'] },
          include: [
            {
              model: usuario,
              attributes: { exclude: ['password'] },
              as: 'usuario',
            },
          ],
        },
      ],
    });

    return res.status(200).json({
      success: true,
      message: 'Éxito',
      data: restaurant,
    });
  } catch (error) {
    return next(error);
  }
};

const updateTables = async (restaurante_id) => {
  try {
    const promises = [];
    const getReservation = await reserva.findAll({
      where: { restaurante_id },
    });

    const tablesForUpdate = [];

    getReservation.forEach((r) => {
      if (r.fecha_hasta < Date.now()) tablesForUpdate.push(r.mesa_id);
    });

    tablesForUpdate.forEach((x) => {
      promises.push(
        mesa.update(
          { disponible: true },
          {
            where: { id: x },
            returning: true,
          }
        )
      );
    });

    await Promise.all(promises);
  } catch (error) {
    throw new Error(error);
  }
};

const getTables = async (req, res, next) => {
  try {
    const { restaurante_id } = req.params;

    await updateTables(restaurante_id);

    const tables = await mesa.findAll({
      where: { restaurante_id },
    });

    return res.status(200).json({ success: true, message: 'Listado de mesas.', data: tables });
  } catch (error) {
    return next(error);
  }
};

const getReservations = async (req, res, next) => {
  try {
    const { restaurante_id } = req.params;

    const reservations = await reserva.findAll({
      where: { restaurante_id },
    });

    reservations.forEach((r) => {
      const fechaDesdeTz = moment.tz(r.fecha_desde, 'America/Asuncion');
      const fechaHastaTz = moment.tz(r.fecha_hasta, 'America/Asuncion');
      r.fecha_desde = fechaDesdeTz._d;
      r.fecha_hasta = fechaHastaTz._d;
    });

    return res
      .status(200)
      .json({ success: true, message: 'Listado de reservas.', data: reservations });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getList,
  getListDetails,
  getTables,
  getReservations,
};
