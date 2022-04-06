const express = require("express");
const authRoutes = require("./auth");
const carRoutes = require("./car");

const app = express();
app.use("/auth/", authRoutes)
app.use("/car/",carRoutes);

module.exports = app;
