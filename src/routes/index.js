const router = require('express').Router();

// End point de prueba
router.get('/getTime', require('../middlewares/getTime'));

router.use('/public', require('./public'));

router.use('/', require('./auth'));

module.exports = router;
