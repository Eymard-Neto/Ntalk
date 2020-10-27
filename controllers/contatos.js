module.exports = (app) => {
  const ContatoController = {
    index: (req, res) => {
      const usuario = req.session.usuario,
        contatos = usuario.contatos ? usuario.contatos : [],
        params = { usuario: usuario, contatos: contatos };

      console.log(params);
      res.render("contatos/index", params);
    },
    create: (req, res) => {
      const contato = req.body.contato,
        usuario = req.session.usuario;
      usuario.contatos.push(contato);
      res.redirect("/contatos");
    },
    show: (req, res) => {
      const id = req.params.id,
        contato = req.session.usuario.contatos[id],
        params = { contato: contato, id: id };
      res.render("/contatos/show", params);
    },
    edit: (req, res) => {
      const id = req.params.id,
        usuario = req.session.usuarios,
        contato = usuario.contatos[id],
        params = { usuario: usuario, contato: contato, id: id };

      res.render("/contatos/edit", params);
    },
    update: (req, res) => {
      const contato = req.body.contato,
        usuario = rq.session.usuario;

      usuario.contatos[req.params.id] = contato;
      res.redirect("/contatos");
    },
    destroy: (req, res) => {
      const usuario = req.session.usuario,
        id = req.params.id;
      usuario.contatos.splice(id, 1);
      res.redirect("/contatos");
    },
  };

  return ContatoController;
};
