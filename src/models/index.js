/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-object-spread */
/* eslint-disable no-underscore-dangle */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');

const basename = path.basename(__filename);

const {
  db: { connectionString, logging, dialectOptions, dialect, timezone },
} = require('../config');

const sequelize = new Sequelize(connectionString, {
  logging,
  dialectOptions,
  dialect,
  timezone,
});

// eslint-disable-next-line no-sync
const _public = require('./public')(sequelize, Sequelize);

const db = Object.assign({}, _public);

// eslint-disable-next-line no-sync
fs.readdirSync(__dirname)
  .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) !== '.js')
  .flatMap((dir) => fs.readdirSync(path.join(__dirname, dir)).map((file) => [dir, file]))
  .filter(
    ([dir, file]) =>
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.slice(-13) === '.associate.js'
  )
  .forEach(([dir, file]) => {
    require(path.join(__dirname, dir, file))(db);
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
