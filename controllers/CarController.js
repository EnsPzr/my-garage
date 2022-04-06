const Car = require("../models/CarModel")
const response = require("../utils/response")
const validate = require("../utils/validate")
const {validationResult} = require('express-validator');

exports.carGetAll = async function (req, res) {
    try {
        const rows = await Car.find({user: req.user.id})
        return response.successResponse(res, rows)
    } catch (e) {
        return response.errorResponse(res, e.message, 500)
    }
}

exports.carGet = async function (req, res) {
    try {
        const id = req.params.id;
        if (!validate.ValidateObjectId(id)) return response.errorResponse(res, "Id format is not correct", 400)

        const car = await Car.findById(id);
        if (!car) return response.errorResponse(res, "Car not found", 404)

        if (car.user.toHexString() !== req.user.id)
            return response.errorResponse(res, "Only see your cars", 403)

        return response.successResponse(res, car)
    } catch (e) {
        return response.errorResponse(res, e.message, 500)
    }
}

exports.carPost = async function (req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return response.errorResponse(res, errors.array().map(d => d.msg).join("<br>"), 400);

        const car = new Car({
            brand: req.body.brand,
            model: req.body.model,
            year: req.body.year,
            km: req.body.km,
            number_plate: req.body.number_plate.replace(/ /g, ""),
            photos: req.body.photos,
            user: req.user.id,
        })

        const exResult = await Car.exists({number_plate: car.number_plate})
        if (exResult) return response.errorResponse(res, "This number plate already exist!", 400)

        await Car.create(car)
        return response.successResponse(res, car)
    } catch (e) {
        response.errorResponse(res, e.message, 500)
    }
}

exports.carPut = async function (req, res) {
    try {
        const id = req.params.id
        if (!validate.ValidateObjectId(id)) return response.errorResponse(res, "Id format is not correct", 400)

        const errors = validationResult(req)
        if (!errors.isEmpty()) return response.errorResponse(res, errors.array().map(d => d.msg).join("<br>"), 400);

        const car = await Car.findById(id);
        if (!car) return response.errorResponse(res, "Car not found", 404)

        if (car.user.toHexString() !== req.user.id)
            return response.errorResponse(res, "Only updated your cars", 403)

        car.brand = req.body.brand
        car.model = req.body.model
        car.year = req.body.year
        car.km = req.body.km
        car.number_plate = req.body.number_plate.replace(/ /g, "")
        car.photos = req.body.photos

        const exResult = await Car.exists({
            $and: [{number_plate: car.number_plate}, {_id: {$ne: id}}]
        })
        if (exResult) return response.errorResponse(res, "This number plate already exist!", 400)

        await Car.updateOne({_id: id}, car)
        return response.successResponse(res, car)
    } catch (e) {
        response.errorResponse(res, e.message, 500)
    }
}

exports.carDelete = async function (req, res) {
    try {
        const id = req.params.id
        if (!validate.ValidateObjectId(id)) return response.errorResponse(res, "Id format is not correct", 400)

        const car = await Car.findById(id);
        if (!car) return response.errorResponse(res, "Car not found", 404)

        if (car.user.toHexString() !== req.user.id)
            return response.errorResponse(res, "Only updated your cars", 403)

        await Car.deleteOne({_id: id})
        return response.successResponse(res, id)
    } catch (e) {
        response.errorResponse(res, e.message, 500)
    }
}
