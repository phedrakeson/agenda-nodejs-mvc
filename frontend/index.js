import './assets/css/style.css';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Login from './modules/Login';
import Contato from './modules/Contato';

const cadastro = new Login('.form-cadastro');
const login = new Login('.form-login');
const edicao = new Contato('.form-edit');
const criacao = new Contato('.form-register');

cadastro.init();
login.init();
edicao.init();
criacao.init();