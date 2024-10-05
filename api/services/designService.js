const designModels = require("../models/designmodels")
const R = require("../utils/responseHelper")

const DesignService = {}

DesignService.add = async(req,res,next)=>{
    try {
        let data = {
            userId:req.doc.userId,
            designType:req.body.designType,
            icon:req.file['icon'][0].filename,
            file:req.file['file'][0].filename,
        }
        let add = await designModels.addDesign(data)
        return R(res,true,"Data added successfully",{},200)
    } catch (error) {
        next(error)
    }
   
}
DesignService.get = async(req,res,next)=>{
    try {
        let get = await designModels.getDesign(req.doc)
        return R(res,true,"Data found successfully",get,200)
    } catch (error) {
        next(error)
    }
  
}
DesignService.update = async(req,res,next)=>{
    try {
        let details = {
            userId:req.doc.userId,
            designType:req.body.designType,
        }
        if(req.file && req.file['icon']){
            details.icon = req.file['icon'][0].filename
        }
        else{
            details.icon = req.body.icon
        }
        if(req.file && req.file['file']){
            details.file = req.file['file'][0].filename
        }
        else{
            details.file = req.body.file
        }
        let add = await designModels.updateDesign(details,req.body.id)
        return R(res,true,"Data updated successfully",{},200)
    } catch (error) {
        next(error)
    }
    
}
DesignService.remove = async(req,res,next)=>{
    try {
        let add = await designModels.deleteDesign(req.body)
        return R(res,true,"Data removed successfully",{},200)
    } catch (error) {
        next(error)
    }
}

DesignService.find = async(req,res,next) => {
    try{
        let find = await designModels.findDesigns(req.body)
        return R(res,true,"Data found successfully",find,200)
    }catch(error){
        next(error)
    }
    

}

module.exports = DesignService