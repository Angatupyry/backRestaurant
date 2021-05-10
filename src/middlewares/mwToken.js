const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const phin = require('phin');

const {
  params: { jwtServer },
} = require('../config');

const getPubkey = () =>
  phin({
    method: 'GET',
    url: `${jwtServer}/auth/public_key`,
    parse: 'json',
  }).then((res) => res.body.public_key);

module.exports = function mwTokenPubKey(req, res, next) {
  const authorization = req.get('authorization') || req.query.token || '';

  if (req.query.token === undefined) {
    if (authorization === '' || authorization.indexOf('Bearer ') === -1) {
      return next(createError(403, 'No encontramos el token requerido.'));
    }
  }

  const token = !req.query.token ? authorization.replace('Bearer ', '') : req.query.token;

  getPubkey()
    .then((publicKey) => {
      try {
        return jwt.verify(token, publicKey);
      } catch (e) {
        return Promise.reject(createError(401, 'El token enviado es invalido.'));
      }
    })
    .then((decoded) => {
      if (typeof decoded.exp === 'undefined') {
        return Promise.reject(
          createError(401, 'El token enviado es invalido, no contiene fecha de expiracion.')
        );
      }
      if (typeof decoded.id === 'undefined') {
        return Promise.reject(
          createError(401, 'El token enviado es invalido, no contiene id del usuario.')
        );
      }
      if (typeof decoded.username === 'undefined') {
        return Promise.reject(
          createError(401, 'El token enviado es invalido, no contiene nombre del usuario.')
        );
      }
      if (new Date(decoded.exp * 1000).getTime() <= Date.now()) {
        return Promise.reject(createError(462, 'El token enviado ha expirado.'));
      }
      return decoded;
    })
    .then((decoded) => {
      req.datos = {
        id: decoded.id,
        nombre: decoded.nombre,
      };
      return next();
    })
    .catch(next);
};
