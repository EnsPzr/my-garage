const Car = require("../models/CarModel")
const response = require("../utils/response")
const validate = require("../utils/validate")

exports.carGetAll = async function (req, res) {
    try {
        const rows = await Car.find({})
        response.successResponse(res, rows)
    } catch (e) {
        response.errorResponse(res,e.message,500)
    }
}

exports.carGet = async function (req, res) {
    try {
        const id = req.params.id;
        if (!validate.ValidateObjectId(id)) {
            response.errorResponse(res,"Id format is not correct",400)
            return;
        }
        const car = await Car.findById(id);
        if (!car) {
            response.errorResponse(res,"Car not found", 404)
            return
        }
        response.successResponse(res, car)
    } catch (e) {
        response.errorResponse(res,e.message,500)
    }
}

exports.carPost = function (req, res) {
    response.successResponse(res,"Car Post Endpoint")
}

exports.carPut = function (req, res) {
    const id = req.params.id
    response.successResponse(res,"Car Put Endpoint")
}

exports.carDelete = function (req, res) {
    const id = req.params.id
    response.successResponse(res,"Car Delete Endpoint")
}
