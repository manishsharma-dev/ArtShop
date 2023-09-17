const express = require("express");
const userTypeRoutes = require("./userTypeRoutes");
const userRoutes = require("./UserRoutes");
const authRoutes = require("./AuthRoutes");
const app = express();

app.use("/auth", authRoutes)
app.use("/user", userRoutes);
app.use("/user-type", userTypeRoutes);


module.exports = app;