/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
const { getTime } = require('../queries');

module.exports = (req, res, next) => {
  getTime()
    .then((result) => {
      result = result[0];
      res.json(result);
    })
    .catch(next);
};
