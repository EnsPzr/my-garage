const mongoose = require("mongoose");
const {body} = require("express-validator");
exports.ValidateObjectId = function (id) {
    return mongoose.isValidObjectId(id)
}

const year = new Date().getFullYear()
exports.carValidation = [
    body("brand").isLength({min: 2}).withMessage("Marka en az 2 karakter olmalıdır").trim(),
    body("model").isLength({min: 2}).withMessage("Model en az 2 karakter olmalıdır").trim(),
    body("year").isInt({min: 1950, max: year}).withMessage(`Yıl en az 1950, en fazla ${year} olabilir`),
    body("km").isNumeric().withMessage("Km sadece rakamlardan oluşabilir").isLength({min: 0}).withMessage("Km en az 0 olabilir"),
    // TODO: Replace don't working?
    body("number_plate").notEmpty().withMessage("Plaka zorunlu bir alandır").replace(/ /g, "")
]
