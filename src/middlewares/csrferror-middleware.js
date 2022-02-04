module.exports = (err, req, res, next) => {
  if(err && err.code === 'EBADCSRFTOKEN') {
    return res.render('404');
  }
}