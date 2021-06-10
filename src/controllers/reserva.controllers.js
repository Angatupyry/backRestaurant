/* eslint-disable no-await-in-loop */
const moment = require('moment');
const { reserva, restaurante } = require('../models');

const controlReservation = async (restaurante_id, mesa_id, fecha_desde, fecha_hasta) => {
  try {
    const restaurant = await restaurante.findOne({
      where: { id: restaurante_id },
    });

    const galleta = moment(fecha_hasta);
    const coquito = moment(fecha_desde);

    const horasDeseadas = galleta.diff(coquito) / (1000 * 60 * 60);

    const sobrepasaHoraMaxima = horasDeseadas > restaurant.horas_maxima_por_mesa;

    if (sobrepasaHoraMaxima) {
      return true;
    }

    return false;
  } catch (error) {
    throw new Error(error);
  }
};

const saveReservation = async (req, res, next) => {
  try {
    const { restaurante_id, mesa_id, usuario_id, fecha_desde, fecha_hasta } = req.body;

    const sobrepasaHoraMaxima = await controlReservation(
      restaurante_id,
      mesa_id,
      fecha_desde,
      fecha_hasta
    );

    if (sobrepasaHoraMaxima) {
      return res.status(200).json({
        success: true,
        message: 'El restaurante no permite esa cantidad de reserva por mesa',
      });
    }

    const reservation = await reserva.create({
      restaurante_id,
      mesa_id,
      usuario_id,
      fecha_desde,
      fecha_hasta,
    });

    return res.status(201).json(reservation);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  saveReservation,
};
