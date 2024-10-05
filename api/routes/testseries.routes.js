const express = require("express")
const router = express.Router();
const TestSeriesService = require("../services/testseriesService");


router.post("/getTestSeries",TestSeriesService.getTestSeries)

module.exports = router