const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CarSchema = new Schema({
    brand: {type: String},
    model: {type: String},
    year: {type: Number},
    km: {type: Number},
    number_plate: {type: String},
}, {
    timestamps: true,
});

module.exports = mongoose.model("Car",CarSchema)
