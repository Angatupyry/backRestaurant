/* eslint-disable no-await-in-loop */
const { reserva, restaurante } = require('../models');

const controlReservation = async (restaurante_id, mesa_id, fecha_desde, fecha_hasta) => {
  try {
    const getReservation = await reserva.findAll({
      where: { restaurante_id, mesa_id },
    });

    getReservation.forEach((r) => {
      if (
        (fecha_desde >= r.fecha_desde && fecha_desde < r.fecha_hasta) ||
        (fecha_hasta > r.fecha_desde && fecha_hasta <= r.fecha_hasta)
      ) {
        /*Error */
      } else {
        /*Control cant_horas */
        const restaurant = restaurante.findOne({
          where: { restaurante_id },
        });

        const getMaxHours = restaurant;
      }
    });

    await Promise.all(promises);
  } catch (error) {
    throw new Error(error);
  }
};

const saveReservation = async (req, res, next) => {
  try {
    const { restaurante_id, mesa_id, usuario_id, fecha_desde, fecha_hasta } = req.body;

    await controlReservation(restaurante_id, mesa_id, fecha_desde, fecha_hasta);

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
