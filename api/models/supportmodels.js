const db = require("../utils/dbConn");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const apiResponse = require("../utils/apiResponses");
// const AppErr = require("../utils/error");
//const { x } = require("pdfkit");
let ObjectId = require("mongodb").ObjectID;

const supportSchema = mongoose.Schema({
    type:{ type:String },
    relatedTo:{ type:String },
    for:{ type:String },
    tcName:{ type:String },
    mobileNumber:{ type:String },
    emailId:{ type:String },
    message:{ type:String },
    newsletters:{type:Boolean},
    date:{ type:Date }
})

supportModel = {}

supportModel.addsupport = async(data) => {
    try{
        let support =await db.connectDb("support",supportSchema);
        let addsupport = await support.create(data)
        if(addsupport){
            return true
        }
    }
    catch(err){
        return err
    }   
}

supportModel.getallsupportrequest = async() => {
    try{
        let support =await db.connectDb("support",supportSchema);
        let getsupport = await support.find()
        if(getsupport){
            return getsupport
        }
    }
    catch(err){
        return err
    }   
}


module.exports = supportModel