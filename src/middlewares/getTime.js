/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
const { getTime } = require('../queries');

module.exports = async (req, res, next) => {
  try {
    return res.status(200).json('Hola');
  } catch (error) {
    return next(error);
  }
};
