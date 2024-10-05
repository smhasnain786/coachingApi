const supportModel = require("../models/supportmodels")
const R = require("../utils/responseHelper")

const supportService = {}

supportService.addSupport = async(req,res,next)=>{
    try{
        let add = await supportModel.addsupport(req.body)
        return R(res,true,"Form submitted successfully!!",{},200)
    }catch(error){
        next(error)
    }
    
}

supportService.getAllSupportRequest = async(req,res,next)=>{
    try {
        let get = await supportModel.getallsupportrequest()
        return R(res,true,"Data found successfully!!",get,200)
    } catch (error) {
        next(error)
    }
   
}
module.exports = supportService