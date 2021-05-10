/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const router = require('express').Router();
const fs = require('fs');
const path = require('path');

const basename = path.basename(__filename);

// eslint-disable-next-line no-sync
fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.slice(-13) !== '.associate.js'
  )
  .forEach((file) => {
    const moduleName = path.join(__dirname, file);
    router.use(`/${file.slice(0, -3)}`, require(moduleName).crud);
  });

module.exports = router;
