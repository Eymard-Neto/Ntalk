module.exports = (app) => {
  const ChatControler = {
    index: (req, res) => {
      let resultado = {email: req.params.email, usuario: req.session.usuario.usuario};
      res.render('chat/index', resultado);
    },
  };

  return ChatControler;
};
