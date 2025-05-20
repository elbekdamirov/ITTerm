const express = require("express");
const config = require("config");
const mongoose = require("mongoose"); //ODM
const cookieParser = require("cookie-parser");
const indexRouter = require("./routes/index.routes");
const viewRouter = require("./routes/views.routes");

const errorHandlingMiddleware = require("./middlewares/errors/error-handling.middleware");
const exHbs = require("express-handlebars");

const PORT = config.get("port") || 3030;

require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

const app = express();
app.use(express.json());
app.use(cookieParser());

const hbs = exHbs.create({
  defaultLayout: "main",
  extname: "hbs",
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views");
app.use(express.static("views"));

app.use("/", viewRouter); //FRONTEND
app.use("/api", indexRouter); //BACKEND

app.use(errorHandlingMiddleware); //error handling eng oxirida yozilishi kerak

async function start() {
  try {
    const uri = config.get("dbUri"); //mongodb://localhost:27017/fn21
    await mongoose.connect(uri);

    app.listen(PORT, () => {
      console.log(`Server running at port http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
