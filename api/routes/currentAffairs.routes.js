const express = require("express")
const router = express.Router();
const CurrentAffairs = require("../services/currentAffairsService");

router.post("/getCurrentAffairsFiles",CurrentAffairs.find)

module.exports = router