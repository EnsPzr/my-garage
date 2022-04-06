const mongoose = require("mongoose");
const {body} = require("express-validator");
exports.ValidateObjectId = function (id) {
    return mongoose.isValidObjectId(id)
}

const year = new Date().getFullYear()
exports.carValidation = [
    body("brand").trim().isLength({min: 2}).withMessage("Brand be minimum 2 character"),
    body("model").trim().isLength({min: 2}).withMessage("Model be minimum 2 character"),
    body("year").isInt({min: 1950, max: year}).withMessage(`Year must be between 1950-${year}`),
    body("km").isNumeric().withMessage("Km must be only numeric characters"),
    // TODO: Replace don't working?
    body("number_plate").notEmpty().withMessage("Number plate is required").replace(/ /g, "")
]

exports.loginValidate = [
    body("email").trim().isLength({min: 2}).withMessage("Email be minimum 2 character").isEmail().withMessage("Please enter the correct format email"),
    body("password").trim().isLength({min: 6}).withMessage("Password be minimum 6 character"),
]


exports.registerValidate = [
    body("email").trim().isLength({min: 2}).withMessage("Email be minimum 2 character").isEmail().withMessage("Please enter the correct format email"),
    body("password").trim().isLength({min: 6}).withMessage("Passwrod be minimum 6 character"),
    body("firstname").trim().isLength({min:2}).withMessage("First name be minimum 2 character"),
    body("lastname").trim().isLength({min:2}).withMessage("Last name be minimum 2 character"),
]
