exports.paginaInicial = (req, res) => {
  res.render('index', {
    titulo: '<span style="color: red;">Titulo</span> da página',
    numeros: [0,1,2,3,4,5,6,7,8]
  });
}

exports.trataFormulario = (req, res) => {
  console.log(req.body);
  res.send(req.body);
}