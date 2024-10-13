const express = require("express")
const router = express.Router();
const authService = require("../services/authServices");
const verifyToken = require("../utils/verifyToken");
const { loginValidation, signUpValidation, forgotPasswordValidation } = require("../validation/app/auth.validation");
const flashService = require("../services/flashMessageService");

router.post('/signup', signUpValidation,authService.signUp)

router.post('/login',loginValidation,authService.loginService)
router.get('/profile',verifyToken, authService.getProfile)
router.post('/google-login', authService.googleLogin)

router.get('/get-flash-message', flashService.getInArray)




router.post("/forgotpassword",forgotPasswordValidation,authService.forgotPassword)
module.exports = router 