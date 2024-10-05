const paperModels = require("../models/papermodels")
const R = require("../utils/responseHelper")

const previousYearPaperService = {}

previousYearPaperService.add = async(req,res,next)=>{
    try{
        const { userId } = req.doc
        const { examType, subject, categoryId,file } = req.body
        let data = {
            userId:userId,
            examType:examType,
            subject:subject,
            categoryId:categoryId,
            file:file
        }
        let add = await paperModels.addPreviousYearPaper(data)
        return R(res,true,"Data added successfully",{},200)
    }catch(error){
        next(error)
    }
}
previousYearPaperService.get = async(req,res,next)=>{
    try {
        let get = await paperModels.getPreviousYearPaper(req.doc)
        return R(res,true,"Data found successfully",get,200)
    } catch (error) {
        next(error)
    }
   
}
previousYearPaperService.update = async(req,res,next)=>{
    try {
        const { categoryId, examType, subject, file, id } = req.body
        let details = {
            categoryId:categoryId,
            examType:examType,
            subject:subject,
            file:file
        }
        let add = await paperModels.updatePreviousYearPaper(details,id)
        return R(res,true,"Data updated successfully",{},200)
    } catch (error) {
        next(error)
    }
}
previousYearPaperService.remove = async(req,res,next)=>{
    try {
        let add = await paperModels.deletePreviousYearPaper(req.body)
        return R(res,true,"Data removed successfully",{},200)
    } catch (error) {
        next(error)
    }

}

previousYearPaperService.getAllPaper = async(req,res)=>{
    try{
        let add = await paperModels.getAllPreviousYearPaperAccordingToCategory(req.body)
        return R(res,true,"Data found Successfully!!",add,200)
    }catch(error){
        next(error)
    }
   
}
module.exports = previousYearPaperService