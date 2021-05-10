const { sequelize, Sequelize } = require('../models');
const readQueries = require('./readQueries');

const queries = readQueries(__dirname);

module.exports = {
  getTime: () => sequelize.query(queries.getTime, { type: Sequelize.QueryTypes.SELECT }),
};
