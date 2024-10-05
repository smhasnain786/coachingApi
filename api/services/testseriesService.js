const testSeriesModels = require("../models/testseries")
const R = require("../utils/responseHelper")

const TestSeriesService = {}

TestSeriesService.add = async(req,res,next)=>{
    try {
        const {fileType,subject,categoryId,plan,releaseDate} = req.body
        const {filename} = req.file
        const { userId } = req.doc
        let data = {
            userId:userId,
            fileType:fileType,
            subject:subject,
            categoryId:categoryId,
            plan:plan,
            releaseDate:releaseDate
        }
        if(req.file && req.file.filename){
            data.file = filename
        }
        let add = await testSeriesModels.addTestSeries(data)
        return R(res,true,"Data added successfully",{},200)
    } catch (error) {
        next(error)
    }
    
}
TestSeriesService.get = async(req,res,next)=>{
    try {
        let get = await testSeriesModels.getTestSeries(req.doc)
        return R(res,true,"Data found successfully",get,200)
    } catch (error) {
        next(error)
    }
   
}
TestSeriesService.update = async(req,res,next)=>{
    try {
        let details = {
            categoryId:req.body.categoryId,
            fileType:req.body.fileType,
            subject:req.body.subject,
            plan:req.body.plan,
            releaseDate:req.body.releaseDate
        }
        if(req.file && req.file.filename){
            details.file = req.file.filename
        }
        else{
            details.file = req.body.file
        }
        let add = await testSeriesModels.updateTestSeries(details,req.body.id)
        return R(res,true,"Data updated successfully",{},200)
    } catch (error) {
        next(error)
    }
}
TestSeriesService.remove = async(req,res,next)=>{
    try {
        const { id } = req.body
        let add = await testSeriesModels.deleteTestSeries(id)
        return R(res,true,"Data removed successfully",{},200)
    } catch (error) {
        next(error)
    }
}

TestSeriesService.getTestSeries = async(req,res,next)=>{
    try{
        let add = await testSeriesModels.getTestSeriesAsQuery(req.body)
        return R(res,true,"Data found successfully!!",add,200)
    }catch(error){
        next(error)
    }
    
}
module.exports = TestSeriesService