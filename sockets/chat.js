module.exports = (io) => {
  const crypto = require("crypto"),
    md5 = crypto.createHash("md5"),
    sockets = io.sockets;

  sockets.on("connection", (client) => {
    const session = client.request.session;
    const usuario = session.usuario;
    client.on("join", (sala) => {
      if (sala) {
        sala = sala.replace("?", "");
      } else {
        let timestamp = new Date().toString();
        let md5 = crypto.createHash("md5");
        sala = md5.update(timestamp).digest("hex");
      }
      client.set("sala", sala);
      client.join(sala);
    });
    client.on("disconnect", () => {
      client.get("sala", (erro, sala) => {
        client.leave(sala);
      });
    });
    client.on("send-server", (data) => {
      let msg = "<br>" + usuario.usuario.nome + ":</br>" + data + "<br/>";
      client.emit("send-client", msg);
      client.broadcast.emit("send-client", msg);
    });
  });
};
