const express = require("express")
const router = express.Router();
const designService = require("../services/designService");

router.post("/getAllDesign",designService.find)

module.exports = router