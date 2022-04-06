const express = require('express')
const app = express()
const mongoose = require('mongoose');


mongoose.connect(process.env.MONGODB_URL).catch(err => {
    console.error(err);
})

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
    console.log("Backend Started...")
})
