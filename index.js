const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const morgan = require("morgan");
const app = express();
const cookieParser = require('cookie-parser');
var apiRouter = require("./routes/ApiRoutes");
//

app.use(cookieParser());

// Handling Uncaught Exception
process.on('uncaughtException', err => {
  console.log(`ERROR: ${err.message}`);
  console.log('Shutting down due to uncaught exception.')
  process.exit(1);
});

//
mongoose
  .connect(process.env.DBURI, { useNewUrlParser: true })
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log("listening on port " + process.env.PORT)
    )
  )
  .catch((err) => console.log(err));

app.use(express.json());

app.use(morgan("dev"));

app.use("/api/", apiRouter);


// Handling Unhandled Promise Rejection
process.on('unhandledRejection', err => {
  console.log(`Error: ${err.message}`);
  console.log('Shutting down the server due to Unhandled promise rejection.')
  server.close( () => {
      process.exit(1);
  }) 
});