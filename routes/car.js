const express = require("express")
const carController = require("../controllers/CarController")
const router = express.Router()

router.get("/", carController.carGetAll)
router.get("/:id", carController.carGet)
router.post("/", carController.carPost)
router.put("/:id", carController.carPut)
router.delete(":/id",carController.carDelete)

module.exports = router;
