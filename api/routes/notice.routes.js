const express = require("express")
const router = express.Router();
const Notice = require("../services/noticeService");

router.post("/add-notice", Notice.createNotice)
router.get("/get-notice", Notice.getNotice)
router.get("/delete-notice", Notice.deleteNotice)
module.exports = router