const mongoose = require('mongoose');
const validator = require('validator');

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
      if(this.errors.length > 0) return;

      try {
        this.user = await LoginModel.create(this.body);
      } catch (error) {
        console.error(error);
      }
    }

    validar() {
      this.cleanUp();
      console.log(this.body)
      if(!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');
      if(this.body.senha.length < 3 || this.body.senha.length > 50) this.errors.push('A senha precisa ter entre 3 e 50 caracteres');


    }

    cleanUp() {
      for(const chave in this.body) {
        if(typeof this.body[chave] !== 'string') {
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