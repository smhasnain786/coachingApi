const express = require("express")
const router = express.Router();
const contactService = require("../services/contact.service");

router.post("/add-contact",contactService.addContact)
module.exports = router
