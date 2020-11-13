const createError = require("http-errors"),
  express = require("express"),
  load = require("express-load"),
  app = express(),
  path = require("path"),
  cookieParser = require("cookie-parser"),
  logger = require("morgan"),
  session = require("express-session"),
  bodyParser = require("body-parser"),
  methodOverride = require("method-override"),
  error = require("./middleware/error"),
  server = require('http').createServer(app),
  io = require('socket.io')(server);


// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(cookieParser("ntalk"));
app.use(session({ resave: true, saveUninitialized: true, secret: "uwotm8" }));
app.use(bodyParser.json());

app.use(logger("dev"));
app.use(express.json());
app.use(methodOverride());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

load("models").then("controllers").then("routes").into(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

app.use(error.notFound);
app.use(error.serverError);

io.sockets.on('connection', (client) => {
  client.on('send-server', (data) => {
    let msg = "<br>"+data.nome+":</br>"+data.msg+"<br/>";
    client.emit('send-client', msg);
    client.broadcast.emit('send-client',msg);
  })
});
server.listen(3000, () => {
  console.log("Ntalk no ar");
});
module.exports = app;
