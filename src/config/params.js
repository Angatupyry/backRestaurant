const { envVarExist } = require('./helpers');

envVarExist('NODE_ICU_DATA');
envVarExist('HOST');
envVarExist('PORT');

module.exports = {
  host: process.env.HOST,
  port: process.env.PORT,
};
