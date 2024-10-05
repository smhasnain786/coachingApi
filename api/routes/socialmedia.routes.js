const express = require("express")
const router = express.Router();
const socialMediaService = require("../services/socialMediaService")

router.get("/get-social-media-url",socialMediaService.getSocialMedia)

module.exports = router