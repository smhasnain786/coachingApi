const ticketModels = require("../models/ticketmodel")
const R = require("../utils/responseHelper")

const ticketService = {}

ticketService.addSupport = async(req,res,next)=>{
    try{
        let add = await ticketModels.addSupport(req.body)
        return R(res,true,"Form submitted successfully!!",{},200)
    }catch(error){
        next(error)
    }
    
}

ticketService.getAllSupportRequest = async(req,res,next)=>{
    try {
        let get = await ticketModels.getallsupportrequest()
        return R(res,true,"Data found successfully!!",get,200)
    } catch (error) {
        next(error)
    }
   
}
ticketService.getAllSupportRequestForUser = async(req,res,next)=>{
    try {
        let get = await ticketModels.getAllSupportRequestByUserId(req.doc)
        return R(res,true,"Data found successfully!!",get,200)
    } catch (error) {
        next(error)
    }
   
}
module.exports = ticketService