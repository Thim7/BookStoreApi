const express = require("express")
const router = express.Router()
const orderControllers = require("../controllers/OrderControllers")

router.get("/", orderControllers.getAllOrders)
router.get("/:id", orderControllers.getOrderById)
router.post("/insert", orderControllers.insertOrder)
router.delete("/delete/:id", orderControllers.removeOrder)
router.put("/update/:id", orderControllers.updateOrder)

module.exports = router
