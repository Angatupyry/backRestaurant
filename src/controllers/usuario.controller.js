/* eslint-disable linebreak-style */
const { usuario } = require('../models');

const registro = async (req, res, next) => {
  try {
    const { username, email, nombre, apellido, password } = req.body;

    const user = await usuario.create(req.body);

    return res.status(201).json(user);
  } catch (error) {
    return next(error);
  }
};

module.exports = { registro };
