/**
  * @api {get} /public/usuario/ Registro
  * @apiGroup Usuario
  * @apiDescription Obtiene los Usuarios de la base de datos
  * @apiParam {Number} [cantidad] Cantidad de elementos por pagina, el minimo es 10.
  * @apiParam {Number} [pagina] Pagina actual que se va a mostrar.
  * @apiParam {STRING} [orden] Puede ser ASC || DESC, se combina con el parametro columna para saber
  *  por que columna ordenar.
  * @apiParam {STRING} [filtro] Busca una coincidencia,s e combina con el parametro
  * columna para saber por cual columna filtrar.
  * @apiParam {STRING} [columna] Parametro que define que columna es objetivo del filtro.
  * * @apiParamExample {json} Input
 {
    "username": "crolon",
    "password": 1,
    "nombre": "César",
    "apellido": "Rolón",
    "telefono": "5136186"
    "email": "crolon@me.com.py"
}
  * @apiSuccessExample {json} Success
  *    HTTP/1.1 200 OK
{
  "success": true,
  "data": [
    {
      "id": 4,
      "username": "acem012",
      "password": "$2b$10$xwRosnlcFDc1QjAWobNa1Odf4h0kxJfYIeWGQCgOeutbjay.Ps7wG",
      "email": "acem@gmail.com",
      "telefono": null,
      "activo": true,
      "nombre": "Adriana",
      "apellido": "Estigarribia"
    }
  ],
  "meta": {
    "registrosPagina": 1,
    "registrosFiltro": 1,
    "registrosTabla": 1,
    "paginaNumero": 1,
    "paginasTotal": 1
  }
}
  * @apiErrorExample {json} List error
  *    HTTP/1.1 500
  */

/**
  * @api {post} /public/usuario/ Usuario
  * @apiGroup Usuario
  * @apiDescription Crea un usuario
  * @apiParam {Number} [cantidad] Cantidad de elementos por pagina, el minimo es 10.
  * @apiParam {Number} [pagina] Pagina actual que se va a mostrar.
  * @apiParam {STRING} [orden] Puede ser ASC || DESC, se combina con el parametro columna para saber
  *  por que columna ordenar.
  * @apiParam {STRING} [filtro] Busca una coincidencia,s e combina con el parametro
  * columna para saber por cual columna filtrar.
  * @apiParam {STRING} [columna] Parametro que define que columna es objetivo del filtro.
  * @apiSuccessExample {json} Success
  *    HTTP/1.1 200 OK

  * @apiErrorExample {json} List error
  *    HTTP/1.1 500
  */
const router = require('express').Router();
const { usuario } = require('../../models');
const { registro } = require('../../controllers/usuario.controller');
const { crud } = require('../crud');

router.post('/', registro);

router.use('/', crud({ modelo: usuario, configList: { columnas: ['nombre'] } }));

module.exports.crud = router;
