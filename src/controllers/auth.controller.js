const jwt = require('jwt-simple');
const bcrypt = require('bcrypt');
const moment = require('moment');
const { usuario } = require('../models');

module.exports = {
  async login(req, res, next) {
    try {
      if (typeof req.body.username === 'undefined' || req.body.username === '') {
        return res.status(200).json({
          message: 'Falta el parámetro usuario',
        });
      }

      if (typeof req.body.password === 'undefined' || req.body.password === '') {
        return res.status(200).json({
          message: 'Falta el parámetro constraseña',
        });
      }

      const user = await usuario.findOne({
        where: {
          username: req.body.username,
        },
      });

      if (!user) {
        return res.status(401).json({
          message: 'No se encontró el usuario',
        });
      }

      if (!user.activo) {
        return res.status(401).json({
          message: 'Usuario Inactivo',
        });
      }

      const passValid = await bcrypt.compare(req.body.password, user.password);
      if (!passValid) {
        return res.status(401).json({
          message: 'Contraseña incorrecta',
        });
      }
      // Tiempo de expiración del token.
      const expires = moment().add(1, 'd').valueOf();
      const payload = {
        id: user.id,
        nombre: req.body.username,
        exp: expires,
      };

      const token = jwt.encode(payload, '!laclave!', 'HS512');

      return res.status(201).json({
        success: true,
        token,
        user,
      });
    } catch (error) {
      return next(error);
    }
  },
};
