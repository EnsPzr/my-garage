const express = require('express')
const app = express()
const fileUpload = require('express-fileupload');
const routes = require("./routes/api")
const mongoose = require('mongoose');
const response = require("./utils/response")
app.use(express.json())

mongoose.connect(process.env.MONGODB_URL).catch(err => {
    console.error(err);
})
app.use(fileUpload({
    createParentPath: true
}));

app.use("/photos",express.static('./photos'))
app.use("/api/", routes)

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        response.errorResponse(res,"You must logging",401)
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
    console.log("Backend Started...")
})
