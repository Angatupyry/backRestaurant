const router = require('express').Router();

// End point de prueba
router.get('/getTime', require('../middlewares/getTime'));

router.use('/public', require('./public'));

module.exports = router;
