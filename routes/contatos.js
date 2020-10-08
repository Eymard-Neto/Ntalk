module.exports = (app) => {
  const contatos = app.controllers.contatos;
  app.get("/contatos", contatos.index);
};
