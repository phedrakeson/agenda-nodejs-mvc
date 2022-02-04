const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/home-controller');
const contatoController = require('./src/controllers/contato-controller');

route.get('/', homeController.paginaInicial);
route.post('/', homeController.trataFormulario);

route.get('/contato', contatoController.paginaInicial);

module.exports = route;