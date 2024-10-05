const db = require("../utils/dbConn");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const apiResponse = require("../utils/apiResponses");
// const AppErr = require("../utils/error");
//const { x } = require("pdfkit");
let ObjectId = require("mongodb").ObjectID;

const socialmediaSchema = mongoose.Schema({
    userId: { type: String },
    facebook: { type: String },
    whatsapp: { type: String },
    twitter: { type: String },
    linkedin: { type: String },
    instagram: { type: String },
    youtube: { type: String },
    telegram: { type: String },
    date:{type:Date}
});

socialMediaModel = {}

socialMediaModel.addsocialmedia = async(data) => {
    try{
        let socialmedia =await db.connectDb("socialmedias",socialmediaSchema);
        let addsocialmedia = await socialmedia.create(data)
        if(addsocialmedia){
            return true
        }
    }
    catch(err){
        return err
    }
}
socialMediaModel.getsocialmedia = async() => {
    try{
        let socialmedia = await db.connectDb("socialmedias",socialmediaSchema);
        let getsocialmedia = await socialmedia.find()
        if(getsocialmedia){
            return getsocialmedia
        }
    }
    catch(err){
        return err
    }
}
socialMediaModel.updatesocialmedia = async(id,data) => {
    try{
        let socialmedia =await db.connectDb("socialmedias",socialmediaSchema);
        let updatesocialmedia = await socialmedia.updateOne({_id:id},{$set:data})
        console.log("updateCategoryupdateCategory",socialmedia)
        if (updatesocialmedia.modifiedCount > 0 || updatesocialmedia.upsertedCount > 0) {
            return true;
        } else {
            return false;
        }
    }
    catch(err){
        return err
    }
}
socialMediaModel.deletesocialmedia = async(id) => {
    try{
        let socialmedia = await db.connectDb("socialmedias",socialmediaSchema);
        let deletesocialmedia = await socialmedia.deleteOne({_id:id})
        if (deletesocialmedia) {
            return true;
        } else {
            return false;
        }
    }
    catch(err){
        return err
    }
}

module.exports = socialMediaModel