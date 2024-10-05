const flashMessageModal = require("../models/flashMessageModal")
const R = require("../utils/responseHelper")

const flashService = {}



flashService.add = async(req,res,next)=>{
    try {
        const data = {
            ...req.body,
            userId:req.doc.userId
        }
        let add = await flashMessageModal.addFlashMessage(data)
        return R(res,true,"Data added successfully!!",{},200)
    } catch (error) {
        next(error)
    }
   
}
flashService.get = async(req,res,next)=>{
    try {
        let get = await flashMessageModal.getFlashMessage(req.doc)
        return R(res,true,"Data found successfully!!",get,200)
    } catch (error) {
        next(error)
    }
}

flashService.getInArray = async(req,res,next)=>{
    try {
        let get = await flashMessageModal.getFlashMessage()
        const messageArray = get.map((item,i)=>{
            return item.message
        })
        return R(res,true,"Data found successfully!!",messageArray,200)
    } catch (error) {
        next(error)
    }
}

flashService.update = async(req,res,next)=>{
    try {
        let data = {
            message : req.body.message
        }
        let update = await flashMessageModal.updateFlashMessage(req.body._id,data)
        return R(res,true,"Data updated successfully!!",{},200)
    } catch (error) {
        next(error)
    }
}
flashService.remove = async(req,res,next)=>{
    try {
        let remove = await flashMessageModal.deleteFlashMessage(req.body._id)
        return R(res,true,"Data removed successfully!!",{},200)
    } catch (error) {
        next(error)
    }
}

module.exports = flashService