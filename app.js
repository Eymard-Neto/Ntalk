const createError = require("http-errors"),
  express = require("express"),
  load = require("express-load"),
  path = require("path"),
  cookieParser = require("cookie-parser"),
  logger = require("morgan"),
  session = require("express-session"),
  bodyParser = require("body-parser"),
  methodOverride = require("method-override"),
  error = require("./middleware/error");
app = express();

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

// // error handler
// app.use((err, req, res, next) => {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

app.use(error.notFound);
app.use(error.serverError);

app.listen(3000, () => {
  console.log("Ntalk no ar");
});
module.exports = app;
