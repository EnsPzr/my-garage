const express = require("express")
const carController = require("../controllers/CarController")
const {carValidation} = require("../utils/validate")
const router = express.Router()
const auth = require("../middleware/jwt")

router.use(auth)
router.get("/", carController.carGetAll)
router.get("/:id", carController.carGet)
router.post("/", carValidation, carController.carPost)
router.put("/:id", carValidation, carController.carPut)
router.delete("/:id", carController.carDelete)

module.exports = router;
