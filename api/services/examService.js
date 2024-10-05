const examModels = require("../models/examModels")
const R = require("../utils/responseHelper")

const exam = {}



exam.addExamDetails = async(data)=>{
    console.log("addnews",data)
    let add = await examModels.addExams(data)
    return add
}
exam.getExamDetails = async()=>{
    let add = await examModels.getExams()
    return add
}
exam.updateExamDetailsById = async(data)=>{
    let add = await examModels.updateExams(data)
    return add
}
exam.deleteExamDetailsById = async(data)=>{
    let add = await examModels.deleteExams(data.id)
    return add
}

module.exports = exam