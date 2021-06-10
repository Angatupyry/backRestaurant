/**
  * @api {post} /public/reserva/ Reserva
  * @apiGroup Restaurante
  * @apiDescription Almacena una reserva
  * @apiParam {Number} [cantidad] Cantidad de elementos por pagina, el minimo es 10.
  * @apiParam {Number} [pagina] Pagina actual que se va a mostrar.
  * @apiParam {STRING} [orden] Puede ser ASC || DESC, se combina con el parametro columna para saber
  *  por que columna ordenar.
  * @apiParam {STRING} [filtro] Busca una coincidencia,s e combina con el parametro
  * columna para saber por cual columna filtrar.
  * @apiParam {STRING} [columna] Parametro que define que columna es objetivo del filtro.
  * @apiParamExample {json} Input
  {
	"restaurante_id": 1,
	"mesa_id": 4,
	"usuario_id": 4,
  "fecha_desde": "2021-06-05 20:00:00",
	"fecha_hasta": "2021-06-05 22:40:00"
}
  * @apiSuccessExample {json} Success
  *    HTTP/1.1 200 OK
{
  "success": true,
  "data": {
    "id": 7,
    "fecha_desde": "2021-06-06T00:00:00.000Z",
    "fecha_hasta": "2021-06-06T02:40:00.000Z",
    "usuario": {
      "id": 4,
      "username": "acem012",
      "email": "acem@gmail.com"
    },
    "restaurante": {
      "id": 1,
      "nombre": "La Camorra",
      "descripcion": "La mejor "
    },
    "mesa": {
      "id": 4,
      "numero": 4
    }
  }
}
  * @apiErrorExample {json} List error
  *    HTTP/1.1 500
  */

const { reserva, usuario, restaurante, mesa } = require('../../models');
const { crud } = require('../crud');

module.exports = {
  crud: crud({
    modelo: reserva,
    configList: { columnas: ['id', 'fecha_desde', 'fecha_hasta'] },
    options: {
      attributes: {
        exclude: ['usuario_id', 'restaurante_id', 'mesa_id'],
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
        {
          model: mesa,
          as: 'mesa',
          attributes: ['id', 'numero'],
        },
      ],
    },
  }),
};
