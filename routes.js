const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/home-controller');
const loginController = require('./src/controllers/login-controller');
const contatoController = require('./src/controllers/contato-controller');
const loginRequiredMiddleware = require('./src/middlewares/loginrequired-middleware');

route.get('/', homeController.index);

// Rotas de Login
route.get('/login/index', loginController.index);
route.post('/login/register', loginController.register);
route.post('/login/login', loginController.login);
route.get('/login/logout', loginController.logout);

// Rotas de contato
route.get('/contato/index', loginRequiredMiddleware, contatoController.index);
route.get('/contato/index/:id', loginRequiredMiddleware, contatoController.edit);
route.post('/contato/edit/:id', loginRequiredMiddleware, contatoController.editContato);
route.get('/contato/delete/:id', loginRequiredMiddleware, contatoController.delete);
route.post('/contato/register', loginRequiredMiddleware, contatoController.register);

module.exports = route;