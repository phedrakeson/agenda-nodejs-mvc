const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const LoginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  senha: { type: String, required: true }
});

const LoginModel = new mongoose.model('login', LoginSchema);

class Login {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async register() {
    this.validar();
    if (this.errors.length > 0) return;
    await this.usuarioExiste();
    if (this.errors.length > 0) return;

    const salt = bcryptjs.genSaltSync();
    this.body.senha = bcryptjs.hashSync(this.body.senha, salt);
    this.user = await LoginModel.create(this.body);
  }

  async login() {
    this.validar();
    if (this.errors.length > 0) return;

    this.user = await LoginModel.findOne({ email: this.body.email });
    if (!this.user) {
      this.errors.push('Usuário não existe');
      return;
    }
    if (!bcryptjs.compareSync(this.body.senha, this.user.senha)) {
      this.errors.push('Senha inválida');
      this.user = null;
      return;
    }
  }

  async usuarioExiste() {
    this.user = await LoginModel.findOne({ email: this.body.email });
    if (this.user) this.errors.push('Usuário já cadastrado');
  }

  validar() {
    this.cleanUp();
    console.log(this.body)
    if (!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');
    if (this.body.senha.length < 3 || this.body.senha.length > 50) this.errors.push('A senha precisa ter entre 3 e 50 caracteres');


  }

  cleanUp() {
    for (const chave in this.body) {
      if (typeof this.body[chave] !== 'string') {
        this.body[chave] = '';
      }
    }
    this.body = {
      email: this.body.email,
      senha: this.body.senha
    };
  }
}

module.exports = Login;