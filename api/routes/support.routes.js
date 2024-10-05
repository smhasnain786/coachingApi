const express = require("express")
const router = express.Router();
const supportService = require("../services/supportService");

router.post("/add-support-request",supportService.addSupport)


module.exports = router