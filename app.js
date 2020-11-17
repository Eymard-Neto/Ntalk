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
  server = require("http").createServer(app),
  io = require("socket.io")(server);

const KEY = "ntalk.sid",
  SECRET = "ntalk";

let cookie = cookieParser(SECRET),
  store = new session.MemoryStore(),
  sessOpts = {
    secret: SECRET,
    key: KEY,
    store: store,
    resave: false,
    saveUninitialized: true,
  },
  sessionConfig = session(sessOpts);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(cookie);
app.use(sessionConfig);
app.use(logger("dev"));
app.use(express.json());
app.use(methodOverride());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

io.use((socket, next) => {
  sessionConfig(socket.request, {}, next);
});

load("models").then("controllers").then("routes").into(app);
load("sockets").into(io);
// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

app.use(error.notFound);
app.use(error.serverError);

server.listen(3000, () => {
  console.log("Ntalk no ar");
});
module.exports = app;
