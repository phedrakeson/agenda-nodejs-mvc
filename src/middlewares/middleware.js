module.exports = (req, res, next) => {
  res.locals.variavelLocal = 'adlkjaww';
  console.log('Middleware global')
  next();
}