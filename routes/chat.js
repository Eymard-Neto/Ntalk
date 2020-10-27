module.exports = (app) => {
  const autenticar = require("./../middleware/autenticar"),
    chat = app.controllers.chat;

  app.get("/chat/:email", autenticar, chat.index);
};
