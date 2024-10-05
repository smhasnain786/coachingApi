const express = require("express")
const router = express.Router();
const authService = require("../services/authServices");
const news = require("../services/newsService");
const R = require("../utils/responseHelper");
const adminService = require("../services/adminService")
const multer = require('multer');
const bookService = require("../services/bookService")


router.post("/addNews",async(req,res)=>{
    let add = await news.addNews(req.body)
    if(add){
        R(res,true,"News section added successfully",{})
    }
    else{
        R(res,false,"Some error occurs")
    }
})
router.get("/getNews",async(req,res)=>{
    let add = await news.getNews(req.body)
    console.log("addddd",add)
    if(add){
        R(res,true,"News section found successfully",add)
    }
    else{
        R(res,false,"Some error occurs")
    }
})

router.post("/updateNewsById",async(req,res)=>{
    let update = await news.updateNewsById(req.body)
    if(update){
        R(res,true,"News section updated successfully",{})
    }
    else{
        R(res,false,"Some error occurs")
    }
})
router.post("/deleteNewsById",async(req,res)=>{
    let deletes = await news.deleteNewsById(req.body);
    if(deletes){
        R(res,true,"News section deleted successfully",{})
    }
    else{
        R(res,false,"Some error occurs")
    }
})

module.exports = router