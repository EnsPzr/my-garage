const Car = require("../models/CarModel")
const response = require("../utils/response")


exports.carGetAll = function (req, res) {
    response.successResponse(res,"Car Get All Endpoint")
}

exports.carGet = function (req, res) {
    const id = req.params.id
    response.successResponse(res,"Car Get Endpoint")
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
