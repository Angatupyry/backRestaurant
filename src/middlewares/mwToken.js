const jwt = require('jwt-simple');

const mwToken = (req, res, next) => {
  let token = req.headers['authorization'] || '';
  if (token !== '') {
    if (token.indexOf('Bearer ') > -1) {
      token = token.replace('Bearer ', '');
    }
    try {
      const decoded = jwt.decode(token, '!laclave!', 'HS512');
      if (typeof decoded.exp === 'undefined') {
        return res.status(401).json({
          success: false,
          message: 'El token tiene que tener una fecha de expiración',
        });
      }
      if (typeof decoded.id === 'undefined') {
        return res.status(401).json({
          success: false,
          message: 'El token enviado es inválid. No contiene codigo de usuario.',
        });
      }

      if (decoded.exp <= Date.now()) {
        return res.status(401).json({
          success: false,
          message: 'El token ha expirado',
        });
      }

      req.datos = {
        id: decoded.id,
        usuario: decoded.user,
      };
      next();
      console.log('Datos enviados al front ', req.datos);
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'El token enviado es inválido',
      });
    }
  } else {
    return res.status(403).json({
      success: false,
      message: 'No encontramos el token referido',
    });
  }
};

module.exports = mwToken;
