module.exports = (app) => {
  const ContatoController = {
    index: (req, res) => {
      const usuario = req.session.usuario,
        params = { usuario: usuario };
      res.render("contatos/index", params);
    },
  };

  return ContatoController;
};
