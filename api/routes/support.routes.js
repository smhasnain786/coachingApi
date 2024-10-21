// const express = require("express")
// const router = express.Router();
// const ticketService = require("../services/ticketService");
// const verifyToken=require('../utils/verifyToken')
// const verifyAdToken=require('../utils/verifyAdToken')

// router.post("/add-support-request",ticketService.addSupport)
// router.get("/all-support-request",ticketService.getAllSupportRequest)
// router.get("/support-by-user-id",verifyToken,ticketService.getAllSupportRequestForUser)
// router.get("/support-by-vendor-id",verifyAdToken,ticketService.getAllSupportRequest)


// module.exports = router

const express = require("express")
const router = express.Router();
const supportService = require("../services/supportService");

router.post("/add-support-request",supportService.addSupport)


module.exports = router