const popUpModal = require("../models/permotionPopupmodels")
const R = require("../utils/responseHelper")

const PermotionPopupService = {}



PermotionPopupService.add = async(req,res,next)=>{
    try {
        const data = {
            link:req?.body?.link,
            modalIcon:req?.file?.filename,
            userId:req.doc.userId
        }
        let add = await popUpModal.add(data)
        return R(res,true,"Data added successfully!!",{},200)
    } catch (error) {
        next(error)
    }
   
}
PermotionPopupService.get = async(req,res,next)=>{
    try {
        let get = await popUpModal.get(req.doc)
        return R(res,true,"Data found successfully!!",get,200)
    } catch (error) {
        next(error)
    }
}


PermotionPopupService.update = async(req,res,next)=>{
    try {
        let data = {
            link : req.body.link
        }
        if(req?.file && req?.file?.filename){
            data.modalIcon = req.file.filename
        }
        else{
            data.modalIcon = req.body.modalIcon
        }
        let update = await popUpModal.update(req.body._id,data)
        return R(res,true,"Data updated successfully!!",{},200)
    } catch (error) {
        next(error)
    }
}
PermotionPopupService.remove = async(req,res,next)=>{
    try {
        let remove = await popUpModal.remove(req.body._id)
        return R(res,true,"Data removed successfully!!",{},200)
    } catch (error) {
        next(error)
    }
}

module.exports = PermotionPopupService