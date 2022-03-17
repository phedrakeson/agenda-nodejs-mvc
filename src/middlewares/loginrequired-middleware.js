module.exports = (req, res, next) => {
  if (!req.session.user) {
    req.flash('errors', 'Você precisa fazer login');
    req.session.save(() => res.redirect('/'));
    return
  }
  next();
}