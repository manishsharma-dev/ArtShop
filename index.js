const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
var apiRouter = require("./routes/ApiRoutes");
//
const corsOptions = {
  origin: process.env.FRONT_END_URL, // Allow requests from this origin
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],      // Allow only specified HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow only specified headers
  credentials: true,  // Allows cookies
  optionsSuccessStatus: 200      // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

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
  server.close(() => {
    process.exit(1);
  })
});