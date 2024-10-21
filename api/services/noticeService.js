const noticeModel = require("../models/noticemodels")
const R = require("../utils/responseHelper")
const NoticeService = {}

NoticeService.createNotice = async(req,res,next)=>{
    try {
        let add = await noticeModel.createNotice(req.body)
        return R(res,true,"Data added successfully!!",add,200)
    } catch (error) {
       
    }
   
}
NoticeService.getNotice = async(req,res,next)=>{
    try {
        let add = await noticeModel.getNotice(req.body)
        return R(res,true,"Notice get successfully!!",add,200)
    } catch (error) {
       
    }
   
}
NoticeService.deleteNotice = async(req,res,next)=>{
    try {
        const {id} = req.body
        let add = await noticeModel.deleteNotice(id)
        return R(res,true,"Notice deleted successfully!!",add,200)
    } catch (error) {
       
    }
   
}
module.exports = NoticeService