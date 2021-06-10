/* eslint-disable max-len */
const createError = require('http-errors');
// eslint-disable-next-line object-curly-newline
const { merge, fromPairs, toPairs, map, pick, omit, pipe } = require('ramda');
const { Sequelize } = require('../models');
const { ROUTES } = require('../config');

const toOrder = (params, orden, column) => {
  const asc = 'ASC';
  const desc = 'DESC';
  const validOrder = [asc, desc];
  const order = validOrder.includes(orden) ? orden : asc;
  return [[column, order]];
};

const toLimit = (cantidad) => {
  const preSize = parseInt(cantidad, 10);
  const size = Number.isNaN(preSize) ? ROUTES.defaultPageSize : preSize;
  if (size < ROUTES.minPageSize) return ROUTES.minPageSize;
  if (size > ROUTES.maxPageSize) return ROUTES.maxPageSize;
  return size;
};

const toNumberOfPages = (rowsCount, limit) => {
  const calculo = rowsCount / limit;
  return Number.isInteger(calculo) ? parseInt(calculo, 10) : parseInt(calculo, 10) + 1;
};

const toOffset = (pagina, cantidad) => {
  const prePage = parseInt(pagina, 10);
  const page = Number.isNaN(prePage) ? 0 : prePage - 1;
  const size = toLimit(cantidad);
  return page * size;
};

const toWhere = (table, filtro, columnas) => {
  if (filtro.length === 0) return {};
  const search = { [Sequelize.Op.iLike]: `%${filtro}%` };
  return {
    [Sequelize.Op.or]: columnas.map((columna) =>
      Sequelize.where(Sequelize.cast(Sequelize.col(`${table.name}.${columna}`), 'varchar'), search)
    ),
  };
};

const overInclude = (query, options) => {
  if (!options.include) return options;

  const qsPairs = Object.entries(query)
    .filter(([key, value]) => key.includes('__'))
    .map(([key, value]) => key.split('__').concat(value));

  const otherField = (model, field, value) =>
    Sequelize.where(Sequelize.cast(Sequelize.col(`${model.model.tableName}.${field}`), 'varchar'), {
      [Sequelize.Op.iLike]: `%${value}%`,
    });

  const idField = (model, field, value) =>
    Sequelize.where(Sequelize.col(`${model.model.tableName}.${field}`), {
      [Sequelize.Op.eq]: value,
    });

  const include = options.include
    .filter((include) => !!include.as)
    .map((model) => {
      // acá tengo que excluir los que no son id
      const attrs = qsPairs
        .filter(([modelName, ...rest]) => modelName === model.as)
        .filter(([_, column, ...rest]) => model.attributes.includes(column))
        .map(([name, field, value]) =>
          field === 'id' ? idField(model, field, value) : otherField(model, field, value)
        );

      const where = attrs.length > 0 ? { where: { [Sequelize.Op.and]: attrs } } : {};

      return merge(model, where);
    });
  return merge(options, { include });
};

/**
 * parsea los include para agregarlo al body con sus _id.
 * example ciudad = { id: 1, nombre: 'asuncion', departamento: { id: 2, nombre: 'central'}} => { id: 1, nombre: 'asuncion', departamento_id: 2}
 * @param {Object} include Sequelize model includes
 * @param {*} body reque body.
 */
const transformBody = (include, body) => {
  if (!include) return body;
  const relatedIds = include.map((x) => x.as);
  const attributes = omit(relatedIds, body);
  return pipe(
    pick(relatedIds),
    map((x) => x.id),
    toPairs,
    map((x) => [`${x[0]}_id`, x[1]]),
    fromPairs,
    merge(attributes)
  )(body);
};

/**
 *
 * @param {Object} modelo Modelo sequelize.
 * @param {Object} params Configura el campo parametro :id de las rutas para machear con un atributo
 * del modelo. Default es { id: 'id' }
 * @param {Boolean} mw Define si se requiere utilizar el middleware token en las ruta. Default true.
 * @param {Object} configList objecto para configurar la funcion de list.
 * @param {Onject} configList.columnas Array con nombre de las columnas que se usan para hacer el filtro.
 * @param {Function} configList.addToWhereFn Funcion que recibe el "req" y que debe retornar un
 * objecto para ser agegado a la condicion where del filtro.
 * @param {Object} options objecto para agregar a las llamadas sequelize, como los include que
 * tiene el modelo.
 * @param {{name: string, include: Object }} relations.nested Array con definiciones para hacer
 * un get anidado de 1 nivel. { name: string, include: {} } donde name es le nombre de paramtreo
 * e include es para pasarle al modelo opciones sequelize para realizar la buscqueda anidada.
 * @param {Function} postBodyFn funcion que recibe el req y el body y se llama antes de pasarle
 * el body al modelo.create;
 * @param {Function} putBodyFn funcion que recibe el req y el body y se llama antes de pasarle
 * el body al modelo.create;
 */
const crud = ({
  modelo,
  params = { id: 'id' },
  mw = true,
  configList = {
    columnas: ['id'],
    addToWhereFn: undefined,
  },
  options = {
    include: [],
  },
  relations = {},
  postBodyFn = (req, body) => body,
  putBodyFn = (req, body) => body,
}) => {
  const router = require('express').Router();

  const { mwToken } = require('../middlewares');

  const onSuccess = (res, status, data) => {
    res.status(status).json({ success: true, data });
  };

  const getList = async (req, res, next) => {
    const { orden, filtro, pagina, cantidad, columna } = req.query;
    const pagina_numero = parseInt(pagina, 10) || 1;
    const columns = Object.keys(modelo.rawAttributes);

    if (columna && !columns.includes(columna)) {
      return next(
        createError(400, `El parametro columna=${columna} no existe en el recurso ${modelo.name}`)
      );
    }

    const column = columna || params.id;
    const order = toOrder(params, orden, column);
    const offset = toOffset(pagina_numero, cantidad);
    const limit = toLimit(cantidad);
    let where = toWhere(modelo, filtro || '', configList.columnas);

    if (configList.addToWhereFn instanceof Function) {
      const addToWhere = await configList.addToWhereFn(req);
      where = merge(where, addToWhere);
    }

    const query = modelo.findAndCountAll({
      ...overInclude(req.query, options),
      where,
      order,
      offset,
      limit,
    });
    const countQuery = modelo.count({
      ...overInclude(req.query, options),
    });

    Promise.all([query, countQuery])
      .then(([result, totalCount]) => {
        const data = result.rows;
        const meta = {
          registrosPagina: result.rows.length,
          registrosFiltro: result.count,
          registrosTabla: totalCount,
          paginaNumero: pagina_numero,
          paginasTotal: toNumberOfPages(result.count, limit),
        };
        res.status(200).json({ success: true, data, meta });
      })
      .catch(next);
  };

  const getId = (req, res, next) => {
    const where = {
      [params.id]: req.params.id,
    };

    modelo
      .findOne({ ...options, where })
      .then((rows) => {
        onSuccess(res, 200, rows);
      })
      .catch(next);
  };

  const getNested = (nestedModel) => (req, res, next) => {
    const where = {
      [params.id]: req.params.id,
    };

    modelo
      .findOne({ where, include: nestedModel })
      .then((record) => {
        onSuccess(res, 200, record[nestedModel.as]);
      })
      .catch(next);
  };

  const post = (req, res, next) => {
    let body = transformBody(options.include, req.body);
    body = postBodyFn(req, body);
    modelo
      .create(body)
      .then((row) => modelo.findOne({ ...options, where: { id: row.id } }))
      .then((row) => {
        onSuccess(res, 201, row);
      })
      .catch(next);
  };

  const put = (req, res, next) => {
    let body = transformBody(options.include, req.body);
    body = putBodyFn(req, body);
    modelo
      .update(body, {
        where: { id: req.params.id },
        returning: true,
      })
      .then((rows) => {
        if (rows[0] === 0) {
          return Promise.reject(createError(404, `No se actualizó el id ${req.params.id}`));
        }
        onSuccess(res, 204, {});
      })
      .catch(next);
  };

  const destroy = (req, res, next) => {
    modelo
      .destroy({
        where: { id: req.params.id },
      })
      .then((affectedRows) => {
        if (affectedRows === 0) {
          return Promise.reject(createError(404, `No se eliminó el id: ${req.params.id}.`));
        }
        onSuccess(res, 204, {});
      })
      .catch(next);
  };

  // Configuracion del router
  // if (mw) router.use(mwToken);

  router.get('/', getList);

  router.get('/:id', getId);

  router.post('/', post);

  router.put('/:id', put);

  router.delete('/:id', destroy);

  if (relations && relations.nested) {
    relations.nested.forEach(({ name, include }) => {
      router.get(`/:id/${name}`, getNested(include));
    });
  }
  return router;
};

module.exports = {
  crud,
  toLimit,
  toOffset,
  toOrder,
  toPairs,
  toWhere,
  overInclude,
  toNumberOfPages,
};
