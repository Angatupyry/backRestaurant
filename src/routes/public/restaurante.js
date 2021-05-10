/**
  * @api {get} /public/restaurante/ Restaurante
  * @apiGroup Persona
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
  "data": [],
  "meta": {
    "registrosPagina": 0,
    "registrosFiltro": 0,
    "registrosTabla": 0,
    "paginaNumero": 1,
    "paginasTotal": 0
  }
}
  * @apiErrorExample {json} List error
  *    HTTP/1.1 500
  */
const { restaurante } = require('../../models');
const { crud } = require('../crud');

module.exports = {
  crud: crud({ modelo: restaurante, configList: { columnas: ['nombre'] } }),
};
