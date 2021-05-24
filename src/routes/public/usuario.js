const router = require('express').Router();
const { usuario } = require('../../models');
const { registro } = require('../../controllers/usuario.controller');
const { crud } = require('../crud');

router.post('/', registro);

router.use('/', crud({ modelo: usuario, configList: { columnas: ['nombre'] } }));

module.exports.crud = router;
