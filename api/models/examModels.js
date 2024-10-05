const db = require("../utils/dbConn");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const apiResponse = require("../utils/apiResponses");
// const AppErr = require("../utils/error");
//const { x } = require("pdfkit");
let ObjectId = require("mongodb").ObjectID;

const examSchema = mongoose.Schema({
    examName: { type: String },
    categoryId: { type: String },
    bookId: { type: String },
    examDate: { type: String },
    date:{type:Date}
});

examModel = {}

examModel.addExams = async(data) => {
    try{
        let exams =await db.connectDb("exams",examSchema);
        let addexams = await exams.create(data)
        if(addexams){
            return addexams
        }
    }
    catch(err){
        return err
    }
}
examModel.getExams = async() => {
    try{
        let exams =await db.connectDb("exams",examSchema);
        let getexams = await exams.find()
        console.log("jdsjfsdj",getexams)
        if(getexams){
            return getexams
        }
    }
    catch(err){
        return err
    }
}
examModel.updateExams = async(exam) => {
    try{
        let exams =await db.connectDb("exams",examSchema);
        let updateexams = await exams.updateOne({_id:exam.id},{$set:{examName:exam.examName,categoryId:exam.categoryId,bookId:exam.bookId,examDate:exam.examDate}})
        console.log("updateCategoryupdateCategory",updateexams)
        if (updateexams.modifiedCount > 0 || updateexams.upsertedCount > 0) {
            return true;
        } else {
            return false;
        }
    }
    catch(err){
        return err
    }
}
examModel.deleteExams = async(id) => {
    try{
        let exams =await db.connectDb("exams",examSchema);
        let deleteexams = await exams.deleteOne({_id:id})
        console.log("updateCategoryupdateCategory",deleteexams)
        if (deleteexams) {
            return true;
        } else {
            return false;
        }
    }
    catch(err){
        return err
    }
}

module.exports = examModel