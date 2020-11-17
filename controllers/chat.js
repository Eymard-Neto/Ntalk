module.exports = (app) => {
  const ChatControler = {
    index: (req, res) => {
      let resultado = { email: req.params.email };
      res.render("chat/index", resultado);
    },
  };

  return ChatControler;
};
