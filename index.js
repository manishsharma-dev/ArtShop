const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const morgan = require('morgan');
const app = express();


//
const userTypeRoutes = require('./routes/userTypeRoutes');
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

app.use(morgan('dev'));

app.use('/user-type',userTypeRoutes);
