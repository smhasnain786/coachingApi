const db = require("../utils/dbConn");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const apiResponse = require("../utils/apiResponses");
// const AppErr = require("../utils/error");
//const { x } = require("pdfkit");
let ObjectId = require("mongodb").ObjectID;

flashMessageModal={}


const flashMessageSchema = mongoose.Schema(
    {
        
        userId:{type:String},
        name:{type:String},
        message:{type:String}
    },
    { timestamps: true }
);

flashMessageModal.addFlashMessage = async(data) =>{
    console.log("datatranslatefile",data);
    const messageAdd = await db.connectDb("flashmessages",flashMessageSchema);
    let insData = await messageAdd.create(data);
    if (insData) {
        return true;
    } else {
        return false
};
}

flashMessageModal.getFlashMessage = async(data) =>{
    const messageGet = await db.connectDb("flashmessages",flashMessageSchema);
    let insData = await messageGet.find();
    if (insData) {
        return insData;
    } else {
        return false
};
}
flashMessageModal.updateFlashMessage = async(_id,data) =>{
    const messageUpdate = await db.connectDb("flashmessages",flashMessageSchema);
    let insData = await messageUpdate.updateOne({_id:_id},{$set:data});
    if (insData) {
        return insData;
    } else {
        return false
};
}
flashMessageModal.deleteFlashMessage = async(_id) =>{
    const messageDelete = await db.connectDb("flashmessages",flashMessageSchema);
    let insData = await messageDelete.deleteOne({_id:_id});
    if (insData) {
        return insData;
    } else {
        return false
};
}

module.exports = flashMessageModal