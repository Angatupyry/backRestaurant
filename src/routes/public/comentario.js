/**
  * @api {get} /public/restaurante/ Comentario
  * @apiGroup Restaurante
  * @apiDescription Obtiene los comentarios
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
      "mensaje": "Muy bueno",
      "puntuacion": 4,
      "usuario": {
        "id": 1,
        "username": "3222111",
        "email": "algo@email.com"
      },
      "restaurante": {
        "id": 1,
        "nombre": "La Camorra",
        "descripcion": "La mejor pizza del Paraguay"
      }
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
const router = require('express').Router();
const { comentario, usuario, restaurante } = require('../../models');
const { crud } = require('../crud');
const { saveComment } = require('../../controllers/comentario.controller');
const mwToken = require('../../middlewares/mwToken');

router.post('/', mwToken, saveComment);

router.use(
  '/',
  crud({
    modelo: comentario,
    configList: { columnas: ['id', 'mensaje', 'puntuacion'] },
    options: {
      attributes: {
        exclude: ['usuario_id', 'restaurante_id'],
      },
      include: [
        {
          model: usuario,
          as: 'usuario',
          attributes: ['id', 'username', 'email'],
        },
        {
          model: restaurante,
          as: 'restaurante',
          attributes: ['id', 'nombre', 'descripcion'],
        },
      ],
    },
  })
);
module.exports.crud = router;
