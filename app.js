const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const indexRouter = require("./routes/index.routes");
const errorHandlingMiddleware = require("./middlewares/errors/error-handling.middleware");
const logger = require("./services/logger.service");

const PORT = config.get("port") || 3030;

require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

const winston = require("winston");
const expressWinston = require("express-winston");
const requestLogger = require("./middlewares/loggers/request.logger");
const requestErrorLogger = require("./middlewares/loggers/request-error.logger");

// logger.log("info", "Oddiy LOG ma'lumoti"); //universal
// logger.error("Error ma'kumoti");
// logger.debug("Debug ma'lumot");
// logger.warn("warn ma'lumot");
// logger.info("Info ma'lumot");
// console.trace("Trace ma'lumot");
// console.table(["JS", "Python", "Java"]);

// console.table([
//   ["Karim", 5],
//   ["Salom", 3],
//   ["Eshmat", 4]
// ])

// console.log(process.env.NODE_ENV);
// console.log(process.env.secret_token);
// console.log(config.get("secret_token"));

// process.on("uncaughtException", (exception) => {
//   console.log("uncaughtException:", exception.message);
// });

// process.on("unhandledRejection", (rejection) => {
//   console.log("unhandledRejection", rejection);
// });

const app = express();
app.use(express.json());
app.use(cookieParser());

//expresshttplog
app.use(requestLogger);

app.use("/api", indexRouter);

//expressErrorLog
app.use(requestErrorLogger);

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
