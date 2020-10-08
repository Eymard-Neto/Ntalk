module.exports = (app) => {
  const HomeController = {
    index: (req, res) => {
      res.render("home/index");
    },

    login: (req, res) => {
      console.log(req);
      const email = req.body.usuario.email,
        nome = req.body.usuario.nome;

      if (email && nome) {
        const usuario = req.body.usuario;
        req.session.usuario = usuario;
        res.redirect("/contatos");
      } else {
        res.redirect("/");
      }
    },

    logout: (req, res) => {
      req.session.destroy();
      res.redirect("/");
    },
  };

  return HomeController;
};
