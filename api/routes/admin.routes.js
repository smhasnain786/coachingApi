const express = require("express")
const router = express.Router();
const authService = require("../services/authServices");
const BookModel = require("../services/bookService");
const R = require("../utils/responseHelper");
const adminService = require("../services/adminService")
const multer = require('multer');
const news = require("../services/newsService");
const exam = require("../services/examService");
const verifyToken = require("../utils/verifyAdToken");
const supportService = require("../services/supportService");
const socialMediaService = require("../services/socialMediaService");
const TestSeriesService = require("../services/testseriesService")
const currentAffairsService = require("../services/currentAffairsService");
const DesignService = require("../services/designService");
const previousYearPaperService = require("../services/previousyearpaperService")
const TypingService = require("../services/typingService")
const dataTranslate = require("../services/datatranslateService");
const flashService = require("../services/flashMessageService");
const PermotionPopupService = require("../services/permotionPopupService")
const { forgotPasswordValidation } = require("../validation/admin/auth.validation")
const { loginValidation } = require("../validation/app/auth.validation");
const { CategoryValidation } = require("../validation/admin/category.validation")



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Set the destination folder for uploaded files
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname); // Set the filename to the original filename
    }
  });
  const upload = multer({ storage });
router.get("/check-authentication",verifyToken)
router.post("/login",loginValidation,adminService.login)
router.get("/get-permission",verifyToken,adminService.getPermission)

router.post("/forgot-password",forgotPasswordValidation, adminService.forgotPassword)


router.post("/add-user",verifyToken,authService.addUsers)

router.get("/get-users",verifyToken, authService.getUsers)
router.post("/subadmin",verifyToken,authService.addsubadmin)

router.post("/get-subadmin-list",verifyToken,authService.getsubadmins)

router.post("/subadminstatus",verifyToken, authService.subadminstatus)

router.post("/updatesudadmin",verifyToken, authService.setsudadmin)

router.post("/deletesubuser",verifyToken, authService.deletesubuser)

router.post("/addCategory",verifyToken,CategoryValidation, BookModel.addcategoryOfBook)

router.get("/getCategory",verifyToken,BookModel.getcategoryOfBook)

router.post("/updateCategoryById",verifyToken,BookModel.updatecategoryOfBookById)

router.post("/deleteCategoryById",verifyToken,BookModel.deletecategoryOfBookById)

router.post("/changeCategoryStatus",verifyToken,BookModel.changeCategoryStatus)

router.post("/addBookDetails",upload.fields([{ name: 'bookIcon', maxCount: 1 }, { name: 'samplePdf', maxCount: 1 },{ name: 'pdfFile', maxCount: 1 },{ name: 'pptFile', maxCount: 1 },{ name: 'pptPdfFile', maxCount: 1 },{ name: 'editableFile', maxCount: 1 }]),verifyToken,BookModel.addBookDetails)

router.get("/getBookList",verifyToken,BookModel.getBooks)

router.post("/updateBookDetailsById",upload.fields([{ name: 'bookIcon', maxCount: 1 }, { name: 'samplePdf', maxCount: 1 }]),verifyToken,BookModel.updateBookDetails)

router.post("/deleteBookDetailsById",upload.single('bookIcon'),verifyToken,BookModel.deleteBookDetails)

router.post("/changeBookStatus",verifyToken,BookModel.changeBookStatus)

router.post("/addBookFiles",upload.single('file'),verifyToken,BookModel.addBookFiles)

router.get("/getBookFiles",verifyToken,BookModel.getBookFiles)

router.post("/updateBookFiles",upload.single('file'),verifyToken,BookModel.updateBookFiles)

router.post("/deleteBookFiles",verifyToken,BookModel.removeBookFiles)

router.post("/addPoster",upload.single('posterIcon'),verifyToken,BookModel.addPoster)

router.get("/getPoster",verifyToken, BookModel.getPoster)

router.post("/updatePosterById",upload.single('posterIcon'),verifyToken,BookModel.updatePoster)

router.post("/deletePosterById",upload.single('posterIcon'),verifyToken, BookModel.deletePoster)

router.post("/changePosterStatus",verifyToken,BookModel.changePosterStatus)

router.get("/getAllReviews",BookModel.getAllReveiw)

router.post("/reviewStatusChange",verifyToken,BookModel.changeStatus)

router.get("/getAllCartDetails",verifyToken,BookModel.getAllCartDetails)

router.get("/getAllSupportRequest",verifyToken,supportService.getAllSupportRequest)

router.post("/setTitlesImage",upload.single('titleIcon'),verifyToken,BookModel.setTitlesImage)

router.post("/getTitleData",verifyToken,BookModel.getTitlesImage)

router.post("/updateTitleDataById",upload.single('titleIcon'),verifyToken,BookModel.updateTitlesImage)

router.post("/deleteTitleDataById",verifyToken,BookModel.deleteTitlesImage)

router.post("/addPromotionAndOfferDetails",upload.single('promotionIcon'),verifyToken,BookModel.addPromotionAndOffer)

router.get("/getPromotionAndOfferDetails",verifyToken,BookModel.getPromotionAndOffer)

router.post("/updatePromotionAndOfferDetails",upload.single('promotionIcon'),verifyToken,BookModel.updatePromotionAndOfferById)

router.post("/deletePromotionAndOfferDetails",verifyToken,BookModel.deletePromotionAndOfferById)

router.post("/addAdminInformation",verifyToken,BookModel.addAdminInformation)

router.get("/getAdminInformation",verifyToken,BookModel.getAdminInformation)

router.post("/updateAdminInformation",verifyToken,BookModel.updateAdminInformation)

router.post("/addSocialMediaurl",verifyToken,socialMediaService.addSocialMediaUrl)

router.get("/getSocialMediaurl",verifyToken,socialMediaService.getSocialMedia)

router.post("/updateSocialMediaurlById",verifyToken,socialMediaService.updateSocialMediaById)

router.post("/deleteSocialMediaurlById",verifyToken,socialMediaService.deleteSocialMediaById)

router.post("/addCurrentAffairsFile",upload.single('file'),verifyToken,currentAffairsService.add)

router.get("/getCurrentAffairsFile",verifyToken,currentAffairsService.get)

router.post("/updateCurrentAffairsFile",upload.single('file'),verifyToken,currentAffairsService.update)

router.post("/deleteCurrentAffairsFile",verifyToken,currentAffairsService.remove)

// router.post("/addTestSeries",upload.fields([{ name: 'pdfFile', maxCount: 1 },{ name: 'pptFile', maxCount: 1 },{ name: 'pptPdfFile', maxCount: 1 },{ name: 'editableFile', maxCount: 1 }]),verifyToken,async(req,res)=>{
//     let resp = await TestSeriesService.add(req.file,req.doc.userId,req.body);
router.post("/addTestSeries",upload.single('file'),verifyToken,TestSeriesService.add)

router.post("/getTestSeries",verifyToken,TestSeriesService.get)

router.post("/updateTestSeries",upload.single('file'),verifyToken,TestSeriesService.update)

router.post("/deleteTestSeries",verifyToken,TestSeriesService.remove)

router.post("/addDesign",upload.fields([{ name: 'icon', maxCount: 1 }, { name: 'file', maxCount: 1 }]),verifyToken,DesignService.add)

router.get("/getDesign",verifyToken,DesignService.get)

router.post("/updateDesign",upload.fields([{ name: 'icon', maxCount: 1 }, { name: 'file', maxCount: 1 }]),verifyToken,DesignService.update)

router.post("/deleteDesign",verifyToken,DesignService.remove)

router.post("/addPreviousYearPaper",verifyToken,previousYearPaperService.add)

router.get("/getPreviousYearPaper",verifyToken,previousYearPaperService.get)

router.post("/updatePreviousYearPaper",verifyToken,previousYearPaperService.update)

router.post("/deletePreviousYearPaper",verifyToken,previousYearPaperService.remove)

router.get("/getAllTypingQuery",verifyToken,TypingService.get)

router.get("/getAllDataTranslateQuery",verifyToken,dataTranslate.get)

router.get("/getNewsletterData",verifyToken,BookModel.getNewsLetter)

router.post("/setFlashMessage",verifyToken,flashService.add)

router.get("/getFlashMessage",verifyToken,flashService.get)

router.post("/updateFlashMessage",verifyToken,flashService.update)

router.post("/deleteFlashMessage",verifyToken,flashService.remove)

router.post("/setPermotionPopupData",verifyToken,upload.single('modalIcon'),PermotionPopupService.add)

router.get("/getPermotionPopupData",verifyToken,PermotionPopupService.get)

router.post("/updatePermotionPopupData",verifyToken,upload.single('modalIcon'),PermotionPopupService.update)

router.post("/deletePermotionPopupData",verifyToken,PermotionPopupService.remove)


module.exports = router