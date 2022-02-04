require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.CONNECTIONSTRING)
  .then(() => {
    app.emit(true);
  })
  .catch((e) => console.error(`Inicialização falhou: ${e}`));
  
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

const sessionOptions = session({
  secret: 'apkpo34123kop23jdiajdawpdaw',
  store: MongoStore.create({mongoUrl: process.env.CONNECTIONSTRING}),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true
  }
});

app.use(sessionOptions);
app.use(flash());

const routes = require('./routes');
const path = require('path');
const middleware = require('./src/middlewares/middleware');
const csrferrorMiddleware = require('./src/middlewares/csrferror-middleware');
const csrfMiddleware = require('./src/middlewares/csrf-middleware');
const helmet = require('helmet');
const CSRF = require('csurf');

app.use(helmet());
app.use(express.static(path.resolve(__dirname, 'public')));
app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}))
app.use(CSRF());
app.use(csrfMiddleware)
app.use(csrferrorMiddleware);
app.use(middleware);
app.use(routes);

app.on(true, () => {
  app.listen(3000, () => {
    console.log('Acesse http://localhost:3000');
    console.log('Servidor rodando...');
  });
})