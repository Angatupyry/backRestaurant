/* eslint-disable linebreak-style */
const bcrypt = require('bcrypt');
const { usuario } = require('../models');

const registro = async (req, res, next) => {
  try {
    const SALT_ROUNDS = 10;

    const { username, email, nombre, apellido, password } = req.body;
    const hashedPass = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await usuario.create({ username, email, nombre, apellido, password: hashedPass });

    return res.status(201).json(user);
  } catch (error) {
    return next(error);
  }
};

module.exports = { registro };
