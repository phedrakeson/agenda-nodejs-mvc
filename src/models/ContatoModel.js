const mongoose = require('mongoose');
const validator = require('validator');

const ContatoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  sobrenome: { type: String, required: false, default: '' },
  email: { type: String, required: false, default: '' },
  telefone: { type: String, required: false, default: '' },
  criadoEm: { type: Date, default: Date.now() }
});

const ContatoModel = new mongoose.model('Contato', ContatoSchema);

class Contato {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.contato = null;
  }
}

Contato.prototype.valida = function () {
  this.cleanUp();
  if (this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');
  if (!this.body.nome) this.errors.push('Nome é um campo obrigatório');
  if (!this.body.nome && this.body.telefone) this.errors.push('Pelo menos um contato precisa ser enviado: email ou telefone')
}

Contato.prototype.cleanUp = function () {
  for (const chave in this.body) {
    if (typeof this.body[chave] !== 'string') {
      this.body[chave] = '';
    }
  }
  this.body = {
    nome: this.body.nome,
    sobrenome: this.body.sobrenome,
    email: this.body.email,
    telefone: this.body.telefone
  };
}

Contato.prototype.register = async function () {
  this.valida();
  if (this.errors.length > 0) return;

  this.contato = await ContatoModel.create(this.body);
}

Contato.prototype.edit = async function (id) {
  if (typeof id !== 'string') return;
  this.valida();
  if (this.errors.length > 0) return;
  this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, { new: true });
}

Contato.buscaPorId = async function (id) {
  if (typeof id !== 'string') return;
  const contato = await ContatoModel.findById(id);
  return contato;
}

Contato.buscaContatos = async function () {
  const contatos = await ContatoModel.find()
    .sort({ criadoEm: -1 });
  return contatos;
}

module.exports = Contato;