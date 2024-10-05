const db = require("../utils/dbConn");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const apiResponse = require("../utils/apiResponses");
// const AppErr = require("../utils/error");
//const { x } = require("pdfkit");
let ObjectId = require("mongodb").ObjectID;

dataTranslateModels={}


const dataTranslateSchema = mongoose.Schema(
    {
        userId:{type:String},
        subject:{type:String},
        name:{type:String},
        email:{type:String},
        file:{type:String},
        message:{type:String},
        date:{type:Date}
    },
    { timestamps: true }
);

dataTranslateModels.addDataTranslate = async(data) =>{
    console.log("datatranslatefile",data);
    const fileAdd = await db.connectDb("datatranslates",dataTranslateSchema);
    let insData = await fileAdd.create(data);
    if (insData) {
        return true;
    } else {
        return false
};
}

dataTranslateModels.getDataTranslate = async(data) =>{
    const fileAdd = await db.connectDb("datatranslates",dataTranslateSchema);
    let insData
    if(data.role == "admin"){
        insData = await fileAdd.find();
    }else{
        insData = await fileAdd.find({userId:data.userId});
    }    
    if (insData) {
        return insData;
    } else {
        return false
};
}

module.exports = dataTranslateModels
