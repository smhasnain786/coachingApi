const db = require("../utils/dbConn");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const apiResponse = require("../utils/apiResponses");
// const AppErr = require("../utils/error");
//const { x } = require("pdfkit");
let ObjectId = require("mongodb").ObjectID;

const newsSchema = mongoose.Schema({
    heading: { type: String },
    news: { type: String },
    date:{type:Date}
});

newsModel = {}

newsModel.addNews = async(data) => {
    try{
        let news =await db.connectDb("news",newsSchema);
        let addnews = await news.create(data)
        if(addnews){
            return addnews
        }
    }
    catch(err){
        return err
    }
}
newsModel.getNews = async() => {
    try{
        let news =await db.connectDb("news",newsSchema);
        let getnews = await news.find()
        console.log("jdsjfsdj",getnews)
        if(getnews){
            return getnews
        }
    }
    catch(err){
        return err
    }
}
newsModel.updateNews = async(data) => {
    try{
        let news =await db.connectDb("news",newsSchema);
        let updatenews = await news.updateOne({_id:data.id},{$set:{heading:data.heading,news:data.news}})
        console.log("updateCategoryupdateCategory",news)
        if (updatenews.modifiedCount > 0 || updatenews.upsertedCount > 0) {
            return true;
        } else {
            return false;
        }
    }
    catch(err){
        return err
    }
}
newsModel.deleteNews = async(id) => {
    try{
        let news =await db.connectDb("news",newsSchema);
        let deletenews = await news.deleteOne({_id:id})
        console.log("updateCategoryupdateCategory",deletenews)
        if (deletenews) {
            return true;
        } else {
            return false;
        }
    }
    catch(err){
        return err
    }
}

module.exports = newsModel