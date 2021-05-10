const express = require('express');
const cors = require('cors');
const rutas = require('./src/routes');

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  cors({
    methods: ['OPTIONS', 'GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    maxAge: 3600,
    preflightContinue: false,
  })
);

// Cambia el header X-Powered-By
function xPoweredBy(req, res, next) {
  res.header('X-Powered-By', 'Restaurante.');
  res.header('X-Hello-Human', 'Somos una aplicación de restaurante');
  next();
}

app.set('x-powered-by', false);
app.use(xPoweredBy);

app.use('/v1', rutas);

app.use((req, res, next) => {
  const date = new Date();
  res.status(404).json({
    succes: false,
    timestamp: date,
    address: `${req.ip} ${req.ips || ''}`,
    method: req.method,
    originalUrl: req.originalUrl,
    message: `404 - ${req.originalUrl} Not Found `,
    author: `Restauranapp. ${date.getFullYear()} ! -`,
  });
  next();
});

module.exports = app;
