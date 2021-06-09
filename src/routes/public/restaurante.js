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

/**
  * @api {get} /public/restaurante/:id Detalle
  * @apiGroup Restaurante
  * @apiDescription Obtiene los restaurantes de la base de datos
  * @apiParam {Number} [id] Identificador del restaurante.
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
  "message": "Éxito",
  "data": [
    {
      "id": 1,
      "nombre": "La Camorra",
      "descripcion": "La mejor pizza del Paraguay",
      "hora_apertura": "19:00:00",
      "hora_cierre": "23:00:00",
      "horas_maxima_por_mesa": 2,
      "mesa": [
        {
          "id": 1,
          "numero": 1,
          "cant_personas": 5,
          "disponible": true
        },
        {
          "id": 2,
          "numero": 2,
          "cant_personas": 2,
          "disponible": true
        },
        {
          "id": 3,
          "numero": 3,
          "cant_personas": 5,
          "disponible": true
        }
      ],
      "comentario": [
        {
          "id": 1,
          "mensaje": "Muy bueno",
          "puntuacion": 4,
          "usuario": {
            "id": 1,
            "username": "3222111",
            "email": "algo@email.com",
            "telefono": "0971788998",
            "activo": true,
            "nombre": "Fran",
            "apellido": "Recalde"
          }
        },
        {
          "id": 3,
          "mensaje": "Wacala",
          "puntuacion": 1,
          "usuario": {
            "id": 2,
            "username": "7934532",
            "email": "algo@email.com",
            "telefono": "0971788998",
            "activo": true,
            "nombre": null,
            "apellido": null
          }
        },
        {
          "id": 4,
          "mensaje": "Excelente",
          "puntuacion": 5,
          "usuario": {
            "id": 1,
            "username": "3222111",
            "email": "algo@email.com",
            "telefono": "0971788998",
            "activo": true,
            "nombre": "Fran",
            "apellido": "Recalde"
          }
        },
        {
          "id": 5,
          "mensaje": "Excelente",
          "puntuacion": 5,
          "usuario": {
            "id": 1,
            "username": "3222111",
            "email": "algo@email.com",
            "telefono": "0971788998",
            "activo": true,
            "nombre": "Fran",
            "apellido": "Recalde"
          }
        }
      ]
    }
  ]
}
  * @apiErrorExample {json} List error
  *    HTTP/1.1 500
  */
/**
  * @api {get} /public/restaurante/mesas/:restaurante_id Mesas
  * @apiGroup Restaurante
  * @apiDescription Obtiene las mesas disponibles por restaurante.
  * @apiParam {Number} [restaurante_id] Identificador del restaurante.
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
  "message": "Listado de mesas.",
  "data": [
    {
      "id": 3,
      "numero": 3,
      "restaurante_id": 1,
      "cant_personas": 2,
      "disponible": true
    },
    {
      "id": 4,
      "numero": 4,
      "restaurante_id": 1,
      "cant_personas": 2,
      "disponible": true
    },
    {
      "id": 5,
      "numero": 5,
      "restaurante_id": 1,
      "cant_personas": 2,
      "disponible": true
    },
    {
      "id": 2,
      "numero": 2,
      "restaurante_id": 1,
      "cant_personas": 2,
      "disponible": true
    },
    {
      "id": 1,
      "numero": 1,
      "restaurante_id": 1,
      "cant_personas": 2,
      "disponible": true
    }
  ]
}
  
  * @apiErrorExample {json} List error
  *    HTTP/1.1 500
  */
const router = require('express').Router();
const { restaurante } = require('../../models');
const { getList, getListDetails, getTables } = require('../../controllers/restaurante.controllers');
const { crud } = require('../crud');

router.get('/', getList);

router.get('/:id', getListDetails);

router.get('/mesas/:restaurante_id', getTables);

router.use('/', crud({ modelo: restaurante, configList: { columnas: ['nombre'] } }));

module.exports.crud = router;
