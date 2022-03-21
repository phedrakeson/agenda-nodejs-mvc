import validator from 'validator';

export default class Contato {
  constructor(formClass) {
    this.form = document.querySelector(formClass);
  }

  init() {
    this.events();
  }

  events() {
    if (!this.form) return;

    this.form.addEventListener('submit', e => {
      e.preventDefault();
      this.validate(e);
    });
  }

  validate(e) {
    const el = e.target;
    const regex = new RegExp('^\\([0-9]{2}\\)((3[0-9]{3}-[0-9]{4})|(9[0-9]{3}-[0-9]{5}))$');
    let error = false;

    const nome = el.querySelector('input[name="nome"]');
    const email = el.querySelector('input[name="email"]');
    const telefone = el.querySelector('input[name="telefone"]');

    if (!nome.value || !nome.value.length > 3) {
      alert('Nome precisa ser maior que 3 caracteres');
      error = true;
    }

    if (!email.value && !telefone.value) {
      alert('Insira pelo menos uma forma de contato');
      error = true;
    }

    if (email.value && !validator.isEmail(email.value)) {
      alert('Email é inválido');
      error = true;
    }

    if (telefone.value && !regex.test(telefone.value)) {
      alert('Telefone é inválido');
      error = true;
    }

    if (!error) e.submit();
  }
}