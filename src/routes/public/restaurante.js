/**
  * @api {get} /public/restaurante/ Restaurante
  * @apiGroup Restaurante
  * @apiDescription Obtiene los restaurantes de la base de datos
  * @apiParam {Number} [cantidad] Cantidad de elementos por pagina, el minimo es 10.
  * @apiParam {Number} [pagina] Pagina actual que se va a mostrar.
  * @apiParam {STRING} [orden] Puede ser ASC || DESC, se combina con el parametro columna para saber
  *  por que columna ordenar.
  * @apiParam {STRING} [filtro] Busca una coincidencia,s e combina con el parametro
  * columna para saber por cual columna filtrar.
  * @apiParam {STRING} [columna] Parametro que define que columna es objetivo del filtro.
  * @apiSuccessExample {json} Success
  *    HTTP/1.1 200 OK
 {
  "success": true,
  "data": [
    {
      "id": 1,
      "nombre": "La Camorra",
      "promedioPuntacion": 3.75
    },
    {
      "id": 2,
      "nombre": "Bear",
      "promedioPuntacion": null
    }
  ]
 }
  * @apiErrorExample {json} List error
  *    HTTP/1.1 500
  */
const router = require('express').Router();
const { restaurante } = require('../../models');
const { getList } = require('../../controllers/restaurante.controllers');
const { crud } = require('../crud');

router.get('/', getList);

router.use('/', crud({ modelo: restaurante, configList: { columnas: ['nombre'] } }));

module.exports.crud = router;
