const express = require('express')
const app = express()
const routes = require("./routes/api")
const mongoose = require('mongoose');

app.use(express.json())

mongoose.connect(process.env.MONGODB_URL).catch(err => {
    console.error(err);
})

app.use("/api/", routes)

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
    console.log("Backend Started...")
})
