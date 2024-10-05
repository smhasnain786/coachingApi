const express = require("express")
const router = express.Router();
const profileService = require("../services/profileService");
const R = require("../utils/responseHelper");
const verifyToken = require("../utils/verifyToken");
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Set the destination folder for uploaded files
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname); // Set the filename to the original filename
    }
  });
  const upload = multer({ storage });

router.post("/updateProfile",upload.single('profileIcon'),verifyToken,profileService.updateProfile)

router.post("/changepassword", verifyToken,profileService.changePassword)


router.get("/showProfile",verifyToken,profileService.showProfile)

router.post("/updateEmailAndMobile",verifyToken,profileService.updateEmailAndPassword)


module.exports = router