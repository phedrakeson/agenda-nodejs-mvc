const Contato = require("../models/ContatoModel");

exports.index = (req, res) => {
  res.render('contato', {
    contato: {}
  });
};

exports.register = async (req, res) => {
  try {
    const contato = new Contato(req.body);

    await contato.register();

    if (contato.errors.length > 0) {
      req.flash('errors', contato.errors);
      req.session.save(() => res.redirect('/contato/index'));
      return;
    }

    req.flash('success', 'Contato registrado com sucesso');
    res.redirect(`/contato/index/${contato.contato._id}`);
    return;
  } catch (error) {
    console.log(error);
    res.render('404');
    return;
  }

}

exports.edit = async (req, res) => {
  if (!req.params.id) return res.render('404');

  const contato = await Contato.buscaPorId(req.params.id);

  if (!contato) return res.render('404');
  console.log('AAAAAAAAAAAAAAAAAAAA', contato)
  res.render('contato', { contato });
}

exports.editContato = async (req, res) => {
  try {
    if (!req.params.id) return res.render('404');
    const contato = new Contato(req.body);
    await contato.edit(req.params.id);

    if (contato.errors.length > 0) {
      req.flash('errors', contato.errors);
      req.session.save(() => res.redirect('/contato/index'));
      return;
    }

    req.flash('success', 'Contato editado com sucesso');
    res.redirect(`/contato/index/${contato.contato._id}`);
    return;
  } catch (error) {
    console.log(error);
    res.render('404');
  }

}