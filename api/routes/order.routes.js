const express = require("express")
const router = express.Router();
const orderService = require("../services/orderService")
const verifyToken = require("../utils/verifyToken");
const verifyTokens = require("../utils/verifyAdToken");



router.post("/add-order",verifyToken,orderService.addOrder)
router.post("/all-order",verifyToken,orderService.getOrdersAll)
router.post("/orders-by-user-id",verifyToken,orderService.getOrdersByUserId)
router.post("/orders-by-subadmin-id",verifyTokens,orderService.getOrdersBySubadminId)





module.exports = router