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
          "content": "   HTTP/1.1 200 OK\n{\n  \"success\": true,\n  \"data\": [\n    {\n      \"id\": 1,\n      \"nombre\": \"La Camorra\",\n      \"promedioPuntacion\": 3.75\n    },\n    {\n      \"id\": 2,\n      \"nombre\": \"Bear\",\n      \"promedioPuntacion\": null\n    }\n  ]\n}",
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
  }
] });
