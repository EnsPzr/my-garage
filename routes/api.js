const express = require("express");
const carRoutes = require("./car");

const app = express();
app.use("/car/",carRoutes);

module.exports = app;
