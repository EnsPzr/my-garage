const Car = require("../models/CarModel")
const response = require("../utils/response")
const validate = require("../utils/validate")
const { validationResult } = require('express-validator');

exports.carGetAll = async function (req, res) {
    try {
        const rows = await Car.find({})
        return response.successResponse(res, rows)
    } catch (e) {
        return response.errorResponse(res,e.message,500)
    }
}

exports.carGet = async function (req, res) {
    try {
        const id = req.params.id;
        if (!validate.ValidateObjectId(id))
            return response.errorResponse(res,"Id format is not correct",400)

        const car = await Car.findById(id);
        if (!car)
            return response.errorResponse(res,"Car not found", 404)

        return response.successResponse(res, car)
    } catch (e) {
        return response.errorResponse(res,e.message,500)
    }
}

exports.carPost = async function (req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return response.errorResponse(res,errors.array().map(d => d.msg).join("<br>"),400);

        const car = new Car({
            brand: req.body.brand,
            model: req.body.model,
            year: req.body.year,
            km: req.body.km,
            number_plate: req.body.number_plate.replace(/ /g, "")
        })

        const exResult = await Car.exists({number_plate: car.number_plate})
        if (exResult)
            return response.errorResponse(res,"This number plate already exist!",400)

        await Car.create(car)
        return response.successResponse(res,car)
    } catch (e) {
        response.errorResponse(res,e.message,500)
    }
}

exports.carPut = function (req, res) {
    const id = req.params.id
    response.successResponse(res,"Car Put Endpoint")
}

exports.carDelete = function (req, res) {
    const id = req.params.id
    response.successResponse(res,"Car Delete Endpoint")
}
