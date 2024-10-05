const DataTranslateModels = require("../models/datatranslatemodels")
const R = require("../utils/responseHelper")

const dataTranslateService = {}

dataTranslateService.add = async(req,res,next)=>{
    try{
        const { subject, name, email, message }  = req.body
    
        let data = {
            userId:req.user.userId,
            subject:subject,
            name:name,
            email:email,
            message:message,
        }
        if(req?.file){
            data.file = req.file.filename
        }
        let add = await DataTranslateModels.addDataTranslate(data)
        return R(res,true,"Data added successfully",{},200)
    }catch(error){
        next(error)
    }
    
}

dataTranslateService.get = async(req,res,next)=>{
    try {
        let add = await DataTranslateModels.getDataTranslate(req.doc)
        return R(res,true,"Data found successfully",add,200)
    } catch (error) {
        next(error)
    }

}

module.exports = dataTranslateService