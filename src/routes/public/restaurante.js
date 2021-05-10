const { restaurante } = require('../../models');
const { crud } = require('../crud');

module.exports = {
  crud: crud({ modelo: restaurante, configList: { columnas: ['nombre'] } }),
};
