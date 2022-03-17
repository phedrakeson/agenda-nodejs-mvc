const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/home-controller');
const loginController = require('./src/controllers/login-controller');

route.get('/', homeController.index);

// Rotas de Login
route.get('/login/index', loginController.index);
route.post('/login/register', loginController.register);
route.post('/login/login', loginController.login);
route.get('/login/logout', loginController.logout);

module.exports = route;