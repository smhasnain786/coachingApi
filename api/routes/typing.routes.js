const express = require("express")
const router = express.Router();
const typingService = require("../services/typingService");
const authMiddleWare = require("../services/authMiddleWare");
const multer = require('multer');
const { typingData } = require("../validation/app/typing.validation");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Set the destination folder for uploaded files
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname); // Set the filename to the original filename
    }
  });
  const upload = multer({ storage });

router.post("/addTypingForm",authMiddleWare.required,upload.single('file'),typingData,typingService.add)

module.exports = router