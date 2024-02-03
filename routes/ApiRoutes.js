const express = require("express");
const userTypeRoutes = require("./userTypeRoutes");
const userRoutes = require("./UserRoutes");
const authRoutes = require("./AuthRoutes");
const configRoutes = require("./ConfigRoutes");
const app = express();

app.use("/auth", authRoutes)
app.use("/user", userRoutes);
app.use("/user-type", userTypeRoutes);
app.use("/config", configRoutes);


module.exports = app;