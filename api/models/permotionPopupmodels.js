const db = require("../utils/dbConn");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const apiResponse = require("../utils/apiResponses");
// const AppErr = require("../utils/error");
//const { x } = require("pdfkit");
let ObjectId = require("mongodb").ObjectID;

const permotionPopupSchema = mongoose.Schema({
    userId:{type: String},
    link: { type: String },
    modalIcon: { type: String },
},
{ timestamps: true }
);

permotionPopupModel = {}

permotionPopupModel.add = async(data) => {
    try{
        let dbConnect =await db.connectDb("permotionPopups",permotionPopupSchema);
        let add = await dbConnect.create(data)
        if(add){
            return add
        }
    }
    catch(err){
        return err
    }
}
permotionPopupModel.get = async(data) => {
    try{
        let dbConnect =await db.connectDb("permotionPopups",permotionPopupSchema);
        let get = await dbConnect.find()
        if(get){
            return get
        }
    }
    catch(err){
        return err
    }
}
permotionPopupModel.update = async(id,data) => {
    try{
        let dbConnect =await db.connectDb("permotionPopups",permotionPopupSchema);
        let update = await dbConnect.updateOne({_id:id},{$set:data})
        if (update.modifiedCount > 0 || update.upsertedCount > 0) {
            return true;
        } else {
            return false;
        }
    }
    catch(err){
        return err
    }
}
permotionPopupModel.remove = async(id) => {
    try{
        let dbConnect =await db.connectDb("permotionPopups",permotionPopupSchema);
        let remove = await dbConnect.deleteOne({_id:id})
        if (remove) {
            return true;
        } else {
            return false;
        }
    }
    catch(err){
        return err
    }
}

module.exports = permotionPopupModel