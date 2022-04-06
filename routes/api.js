const express = require("express");
const authRoutes = require("./auth");
const carRoutes = require("./car");
const uploadController = require("../controllers/UploadController")

const app = express();

app.post("/upload", uploadController.uploadFile)
app.use("/auth/", authRoutes)
app.use("/car/",carRoutes);

module.exports = app;
