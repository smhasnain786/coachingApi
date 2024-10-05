const typingModels = require("../models/typingmodels")
const R = require("../utils/responseHelper")

const typingService = {}

typingService.add = async(req,res,next)=>{
    try{
        let {subject,name,email,message} = req.body
        let data = {
            userId:req.user.userId,
            subject:subject,
            name:name,
            email:email,
            message:message
        }
        if(req?.file){
            data.file = req.file.filename
        }
        let add = await typingModels.addTyping(data)
        return R(res,true,"Form submitted successfully!!",{},200)
    }catch(error){
        next(error)
    }
    
}
typingService.get = async(req,res,next)=>{
    try {
        let get = await typingModels.getTyping(req.doc)
        return R(res,true,"Data found successfully",get,200)
    } catch (error) {
        next(error)
    }
  
}

module.exports = typingService