const mongoose = require("mongoose");
exports.ValidateObjectId = function (id) {
    return mongoose.isValidObjectId(id)
}
