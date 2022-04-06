const response = require("../utils/response")
const typeControl = require("../utils/validate")
const fs = require("fs")
const path = require("path")
const uuid = require("uuid")

exports.uploadFile = async function (req, res) {
    try {
        for (const photo of req.files.photos) {
            if (!typeControl.PhotoTypeValidate(photo.mimetype))
                return response.errorResponse("Only accept image types");
        }

        if (!fs.existsSync("./photos"))
            fs.mkdirSync("./photos")

        const result = []

        for (const photo of req.files.photos) {
            const fileName = "./photos/" + uuid.v4() + path.extname(photo.name)
            await photo.mv(fileName)
            result.push(fileName)
        }

        return response.successResponse(res, result)
    } catch (e) {
        return response.errorResponse(res, e.message, 500)
    }
}
