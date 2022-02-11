module.exports = (req, res, next) => {
  res.locals.errors = req.flash('errors');
  res.locals.success = req.flash('success');
  console.log('Middleware global')
  next();
}