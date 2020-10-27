module.exports = (app) => {
  const autenticar = require("./../middleware/autenticar"),
    contatos = app.controllers.contatos;
  app.get("/contatos", contatos.index);
  3;
  app.get("/contato/:id", autenticar, contatos.show);
  app.post("/contato", autenticar, contatos.create);
  app.get("/contato/:id/editar", autenticar, contatos.edit);
  app.put("/contato/:id", autenticar, contatos.update);
  app.delete("/contato/:id", autenticar, contatos.destroy);
};
