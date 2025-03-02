const exphbs = require("express-handlebars");
const path = require("path");

function handlebarsConfig(app) {
  app.engine(
    "hbs",
    exphbs.engine({
      extname: ".hbs",
      defaultLayout: "main",
      layoutsDir: path.join(__dirname, "../views/layouts"),
      partialsDir: path.join(__dirname, "../views/partials"),
    })
  );
  app.set("views", path.join(__dirname, "../views"));
  app.set("view engine", "hbs");
}

module.exports = handlebarsConfig;
