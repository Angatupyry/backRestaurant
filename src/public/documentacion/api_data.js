define({ "api": [
  {
    "type": "get",
    "url": "/public/restaurante/",
    "title": "Comentario",
    "group": "Restaurante",
    "description": "<p>Obtiene los comentarios</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "cantidad",
            "description": "<p>Cantidad de elementos por pagina, el minimo es 10.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "pagina",
            "description": "<p>Pagina actual que se va a mostrar.</p>"
          },
          {
            "group": "Parameter",
            "type": "STRING",
            "optional": true,
            "field": "orden",
            "description": "<p>Puede ser ASC || DESC, se combina con el parametro columna para saber por que columna ordenar.</p>"
          },
          {
            "group": "Parameter",
            "type": "STRING",
            "optional": true,
            "field": "filtro",
            "description": "<p>Busca una coincidencia,s e combina con el parametro columna para saber por cual columna filtrar.</p>"
          },
          {
            "group": "Parameter",
            "type": "STRING",
            "optional": true,
            "field": "columna",
            "description": "<p>Parametro que define que columna es objetivo del filtro.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n{\n  \"success\": true,\n  \"data\": [\n    {\n      \"id\": 1,\n      \"mensaje\": \"Muy bueno\",\n      \"puntuacion\": 4,\n      \"usuario\": {\n        \"id\": 1,\n        \"username\": \"3222111\",\n        \"email\": \"algo@email.com\"\n      },\n      \"restaurante\": {\n        \"id\": 1,\n        \"nombre\": \"La Camorra\",\n        \"descripcion\": \"La mejor pizza del Paraguay\"\n      }\n    }\n  ],\n  \"meta\": {\n    \"registrosPagina\": 1,\n    \"registrosFiltro\": 1,\n    \"registrosTabla\": 1,\n    \"paginaNumero\": 1,\n    \"paginasTotal\": 1\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/public/comentario.js",
    "groupTitle": "Restaurante",
    "name": "GetPublicRestaurante"
  },
  {
    "type": "get",
    "url": "/public/restaurante/",
    "title": "Restaurante",
    "group": "Restaurante",
    "description": "<p>Obtiene los restaurantes de la base de datos</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "cantidad",
            "description": "<p>Cantidad de elementos por pagina, el minimo es 10.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "pagina",
            "description": "<p>Pagina actual que se va a mostrar.</p>"
          },
          {
            "group": "Parameter",
            "type": "STRING",
            "optional": true,
            "field": "orden",
            "description": "<p>Puede ser ASC || DESC, se combina con el parametro columna para saber por que columna ordenar.</p>"
          },
          {
            "group": "Parameter",
            "type": "STRING",
            "optional": true,
            "field": "filtro",
            "description": "<p>Busca una coincidencia,s e combina con el parametro columna para saber por cual columna filtrar.</p>"
          },
          {
            "group": "Parameter",
            "type": "STRING",
            "optional": true,
            "field": "columna",
            "description": "<p>Parametro que define que columna es objetivo del filtro.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "  HTTP/1.1 200 OK\n{\n \"success\": true,\n \"data\": [\n   {\n     \"id\": 1,\n     \"nombre\": \"La Camorra\",\n     \"promedioPuntacion\": 3.75\n   },\n   {\n     \"id\": 2,\n     \"nombre\": \"Bear\",\n     \"promedioPuntacion\": null\n   }\n ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/public/restaurante.js",
    "groupTitle": "Restaurante",
    "name": "GetPublicRestaurante"
  },
  {
    "type": "get",
    "url": "/public/restaurante/:id",
    "title": "Detalle",
    "group": "Restaurante",
    "description": "<p>Obtiene los restaurantes de la base de datos</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "id",
            "description": "<p>Identificador del restaurante.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "cantidad",
            "description": "<p>Cantidad de elementos por pagina, el minimo es 10.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "pagina",
            "description": "<p>Pagina actual que se va a mostrar.</p>"
          },
          {
            "group": "Parameter",
            "type": "STRING",
            "optional": true,
            "field": "orden",
            "description": "<p>Puede ser ASC || DESC, se combina con el parametro columna para saber por que columna ordenar.</p>"
          },
          {
            "group": "Parameter",
            "type": "STRING",
            "optional": true,
            "field": "filtro",
            "description": "<p>Busca una coincidencia,s e combina con el parametro columna para saber por cual columna filtrar.</p>"
          },
          {
            "group": "Parameter",
            "type": "STRING",
            "optional": true,
            "field": "columna",
            "description": "<p>Parametro que define que columna es objetivo del filtro.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n {\n  \"success\": true,\n  \"message\": \"Éxito\",\n  \"data\": [\n    {\n      \"id\": 1,\n      \"nombre\": \"La Camorra\",\n      \"descripcion\": \"La mejor pizza del Paraguay\",\n      \"hora_apertura\": \"19:00:00\",\n      \"hora_cierre\": \"23:00:00\",\n      \"horas_maxima_por_mesa\": 2,\n      \"mesa\": [\n        {\n          \"id\": 1,\n          \"numero\": 1,\n          \"cant_personas\": 5,\n          \"disponible\": true\n        },\n        {\n          \"id\": 2,\n          \"numero\": 2,\n          \"cant_personas\": 2,\n          \"disponible\": true\n        },\n        {\n          \"id\": 3,\n          \"numero\": 3,\n          \"cant_personas\": 5,\n          \"disponible\": true\n        }\n      ],\n      \"comentario\": [\n        {\n          \"id\": 1,\n          \"mensaje\": \"Muy bueno\",\n          \"puntuacion\": 4,\n          \"usuario\": {\n            \"id\": 1,\n            \"username\": \"3222111\",\n            \"email\": \"algo@email.com\",\n            \"telefono\": \"0971788998\",\n            \"activo\": true,\n            \"nombre\": \"Fran\",\n            \"apellido\": \"Recalde\"\n          }\n        },\n        {\n          \"id\": 3,\n          \"mensaje\": \"Wacala\",\n          \"puntuacion\": 1,\n          \"usuario\": {\n            \"id\": 2,\n            \"username\": \"7934532\",\n            \"email\": \"algo@email.com\",\n            \"telefono\": \"0971788998\",\n            \"activo\": true,\n            \"nombre\": null,\n            \"apellido\": null\n          }\n        },\n        {\n          \"id\": 4,\n          \"mensaje\": \"Excelente\",\n          \"puntuacion\": 5,\n          \"usuario\": {\n            \"id\": 1,\n            \"username\": \"3222111\",\n            \"email\": \"algo@email.com\",\n            \"telefono\": \"0971788998\",\n            \"activo\": true,\n            \"nombre\": \"Fran\",\n            \"apellido\": \"Recalde\"\n          }\n        },\n        {\n          \"id\": 5,\n          \"mensaje\": \"Excelente\",\n          \"puntuacion\": 5,\n          \"usuario\": {\n            \"id\": 1,\n            \"username\": \"3222111\",\n            \"email\": \"algo@email.com\",\n            \"telefono\": \"0971788998\",\n            \"activo\": true,\n            \"nombre\": \"Fran\",\n            \"apellido\": \"Recalde\"\n          }\n        }\n      ]\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/public/restaurante.js",
    "groupTitle": "Restaurante",
    "name": "GetPublicRestauranteId"
  },
  {
    "type": "get",
    "url": "/public/restaurante/mesas/:restaurante_id",
    "title": "Mesas",
    "group": "Restaurante",
    "description": "<p>Obtiene las mesas disponibles por restaurante.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "restaurante_id",
            "description": "<p>Identificador del restaurante.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "cantidad",
            "description": "<p>Cantidad de elementos por pagina, el minimo es 10.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "pagina",
            "description": "<p>Pagina actual que se va a mostrar.</p>"
          },
          {
            "group": "Parameter",
            "type": "STRING",
            "optional": true,
            "field": "orden",
            "description": "<p>Puede ser ASC || DESC, se combina con el parametro columna para saber por que columna ordenar.</p>"
          },
          {
            "group": "Parameter",
            "type": "STRING",
            "optional": true,
            "field": "filtro",
            "description": "<p>Busca una coincidencia,s e combina con el parametro columna para saber por cual columna filtrar.</p>"
          },
          {
            "group": "Parameter",
            "type": "STRING",
            "optional": true,
            "field": "columna",
            "description": "<p>Parametro que define que columna es objetivo del filtro.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n {\n  \"success\": true,\n  \"message\": \"Listado de mesas.\",\n  \"data\": [\n    {\n      \"id\": 3,\n      \"numero\": 3,\n      \"restaurante_id\": 1,\n      \"cant_personas\": 2,\n      \"disponible\": true\n    },\n    {\n      \"id\": 4,\n      \"numero\": 4,\n      \"restaurante_id\": 1,\n      \"cant_personas\": 2,\n      \"disponible\": true\n    },\n    {\n      \"id\": 5,\n      \"numero\": 5,\n      \"restaurante_id\": 1,\n      \"cant_personas\": 2,\n      \"disponible\": true\n    },\n    {\n      \"id\": 2,\n      \"numero\": 2,\n      \"restaurante_id\": 1,\n      \"cant_personas\": 2,\n      \"disponible\": true\n    },\n    {\n      \"id\": 1,\n      \"numero\": 1,\n      \"restaurante_id\": 1,\n      \"cant_personas\": 2,\n      \"disponible\": true\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/public/restaurante.js",
    "groupTitle": "Restaurante",
    "name": "GetPublicRestauranteMesasRestaurante_id"
  },
  {
    "type": "post",
    "url": "/public/reserva/",
    "title": "Reserva",
    "group": "Restaurante",
    "description": "<p>Almacena una reserva</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "cantidad",
            "description": "<p>Cantidad de elementos por pagina, el minimo es 10.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "pagina",
            "description": "<p>Pagina actual que se va a mostrar.</p>"
          },
          {
            "group": "Parameter",
            "type": "STRING",
            "optional": true,
            "field": "orden",
            "description": "<p>Puede ser ASC || DESC, se combina con el parametro columna para saber por que columna ordenar.</p>"
          },
          {
            "group": "Parameter",
            "type": "STRING",
            "optional": true,
            "field": "filtro",
            "description": "<p>Busca una coincidencia,s e combina con el parametro columna para saber por cual columna filtrar.</p>"
          },
          {
            "group": "Parameter",
            "type": "STRING",
            "optional": true,
            "field": "columna",
            "description": "<p>Parametro que define que columna es objetivo del filtro.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "  {\n\t\"restaurante_id\": 1,\n\t\"mesa_id\": 4,\n\t\"usuario_id\": 4,\n  \"fecha_desde\": \"2021-06-05 20:00:00\",\n\t\"fecha_hasta\": \"2021-06-05 22:40:00\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n{\n  \"success\": true,\n  \"data\": {\n    \"id\": 7,\n    \"fecha_desde\": \"2021-06-06T00:00:00.000Z\",\n    \"fecha_hasta\": \"2021-06-06T02:40:00.000Z\",\n    \"usuario\": {\n      \"id\": 4,\n      \"username\": \"acem012\",\n      \"email\": \"acem@gmail.com\"\n    },\n    \"restaurante\": {\n      \"id\": 1,\n      \"nombre\": \"La Camorra\",\n      \"descripcion\": \"La mejor \"\n    },\n    \"mesa\": {\n      \"id\": 4,\n      \"numero\": 4\n    }\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/public/reserva.js",
    "groupTitle": "Restaurante",
    "name": "PostPublicReserva"
  },
  {
    "type": "get",
    "url": "/public/usuario/",
    "title": "Registro",
    "group": "Usuario",
    "description": "<p>Obtiene los Usuarios de la base de datos</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "cantidad",
            "description": "<p>Cantidad de elementos por pagina, el minimo es 10.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "pagina",
            "description": "<p>Pagina actual que se va a mostrar.</p>"
          },
          {
            "group": "Parameter",
            "type": "STRING",
            "optional": true,
            "field": "orden",
            "description": "<p>Puede ser ASC || DESC, se combina con el parametro columna para saber por que columna ordenar.</p>"
          },
          {
            "group": "Parameter",
            "type": "STRING",
            "optional": true,
            "field": "filtro",
            "description": "<p>Busca una coincidencia,s e combina con el parametro columna para saber por cual columna filtrar.</p>"
          },
          {
            "group": "Parameter",
            "type": "STRING",
            "optional": true,
            "field": "columna",
            "description": "<p>Parametro que define que columna es objetivo del filtro.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": " {\n    \"username\": \"crolon\",\n    \"password\": 1,\n    \"nombre\": \"César\",\n    \"apellido\": \"Rolón\",\n    \"telefono\": \"5136186\"\n    \"email\": \"crolon@me.com.py\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n{\n  \"success\": true,\n  \"data\": [\n    {\n      \"id\": 4,\n      \"username\": \"acem012\",\n      \"password\": \"$2b$10$xwRosnlcFDc1QjAWobNa1Odf4h0kxJfYIeWGQCgOeutbjay.Ps7wG\",\n      \"email\": \"acem@gmail.com\",\n      \"telefono\": null,\n      \"activo\": true,\n      \"nombre\": \"Adriana\",\n      \"apellido\": \"Estigarribia\"\n    }\n  ],\n  \"meta\": {\n    \"registrosPagina\": 1,\n    \"registrosFiltro\": 1,\n    \"registrosTabla\": 1,\n    \"paginaNumero\": 1,\n    \"paginasTotal\": 1\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/public/usuario.js",
    "groupTitle": "Usuario",
    "name": "GetPublicUsuario"
  },
  {
    "type": "post",
    "url": "/public/usuario/",
    "title": "Usuario",
    "group": "Usuario",
    "description": "<p>Crea un usuario</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "cantidad",
            "description": "<p>Cantidad de elementos por pagina, el minimo es 10.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "pagina",
            "description": "<p>Pagina actual que se va a mostrar.</p>"
          },
          {
            "group": "Parameter",
            "type": "STRING",
            "optional": true,
            "field": "orden",
            "description": "<p>Puede ser ASC || DESC, se combina con el parametro columna para saber por que columna ordenar.</p>"
          },
          {
            "group": "Parameter",
            "type": "STRING",
            "optional": true,
            "field": "filtro",
            "description": "<p>Busca una coincidencia,s e combina con el parametro columna para saber por cual columna filtrar.</p>"
          },
          {
            "group": "Parameter",
            "type": "STRING",
            "optional": true,
            "field": "columna",
            "description": "<p>Parametro que define que columna es objetivo del filtro.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/public/usuario.js",
    "groupTitle": "Usuario",
    "name": "PostPublicUsuario"
  }
] });
