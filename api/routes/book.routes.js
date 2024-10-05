const express = require("express")
const router = express.Router();
const bookService = require("../services/bookService")
const verifyToken = require("../utils/verifyToken");
const PermotionPopupService = require("../services/permotionPopupService")


router.get("/get-category",bookService.getAllCategory)

router.get("/get-books",bookService.getAllBooks)

router.get("/get-books-content-by-id/:id",bookService.getBookContentById)
router.post("/get-books-content-file-by-id",bookService.getBookContentFileById)

router.post("/get-books-by-category-id",bookService.getAllBooksByCategoryId)

router.get("/get-poster",bookService.getAllPosters)

router.post("/add-newsletter",bookService.addNewsLetter)

router.post("/add-book-review",bookService.addBookReviews)

router.post("/add-book-to-cart",bookService.addBookToCart)

router.post("/add-book-to-cart-by-userid",verifyToken,bookService.addBookToCart)

router.get("/get-book-from-cart-by-ip",bookService.getBookFromCart)

router.get("/get-book-from-cart-by-userid",verifyToken,bookService.getBookfromCartByUserId)

router.post("/remove-item-from-cart",bookService.removeItemFromCart)

router.post("/get-bookdetail-by-id",bookService.getBookDetailsById)

router.get("/get-permotion-&-offer",bookService.getPromotionAndOffer)

router.get("/get-trending-title-&-images",bookService.getTitlesImage)

router.get("/get-admin-info",bookService.getAdminInformation)

router.get("/get-cart-info",bookService.getCartInfo)

router.get("/get-cart-info-by-userid",verifyToken,bookService.getCartInfoByUserId)

router.post("/getAllEBooks", bookService.getAllEBooks)

router.get("/getPermotionModal", PermotionPopupService.get)



module.exports = router