const db = require("../utils/dbConn");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const apiResponse = require("../utils/apiResponses");
// const AppErr = require("../utils/error");
//const { x } = require("pdfkit");
let ObjectId = require("mongodb").ObjectID;

paperModels={}


const paperSchema = mongoose.Schema(
    {
        userId:{type:String},
        categoryId:{type:String},
        file:{type:String},
        subject:{type:String},
        examType:{type:String},
        date:{type:Date}
    },
    { timestamps: true }
);

paperModels.addPreviousYearPaper = async(data) =>{
    const fileAdd = await db.connectDb("papers",paperSchema);
    let insData = await fileAdd.create(data);
    if (insData) {
        return true;
    } else {
        return false
};
}

paperModels.getPreviousYearPaper = async(data) => {
    try{
        let promotion =await db.connectDb("papers",paperSchema);
        let get
        if(data.role == "admin"){
            get = await promotion.aggregate([
                { $addFields: { "categoryObjId": { "$toObjectId": "$categoryId" } } },
                {
                    $lookup: {
                        "from": "categories",
                        "localField": "categoryObjId",
                        "foreignField": "_id",
                        "as": "categoryData"
                    }},
                ])
        }else{
            get = await promotion.aggregate([
                {$match:{userId:data.userId}},
                { $addFields: { "categoryObjId": { "$toObjectId": "$categoryId" } } },
                {
                    $lookup: {
                        "from": "categories",
                        "localField": "categoryObjId",
                        "foreignField": "_id",
                        "as": "categoryData"
                    }},
                ])
        }
        if (get) {
            return get;
        } else {
            return false;
        }
    }
    catch(err){
        return err
    }
}

paperModels.updatePreviousYearPaper = async(data,id) =>{
    const fileAdd = await db.connectDb("papers",paperSchema);
    let insData = await fileAdd.updateOne({_id:id},{$set:data});
    if (insData) {
        return true;
    } else {
        return false
};
}
paperModels.deletePreviousYearPaper = async(data) =>{
    const fileAdd = await db.connectDb("papers",paperSchema);
    let insData = await fileAdd.deleteOne({_id:data.id});
    if (insData) {
        return true;
    } else {
        return false
};
}

paperModels.getAllPreviousYearPaperAccordingToCategory = async(data) =>{
    let query
    if(data && data.categoryId){
        query = {$match:{categoryId:data.categoryId}},
            { $addFields: { "categoryObjId": { "$toObjectId": "$categoryId" } } }
    }
    else{
        query = { $addFields: { "categoryObjId": { "$toObjectId": "$categoryId" } } }
    }
    try{
        let promotion =await db.connectDb("papers",paperSchema);
        let get = await promotion.aggregate([
            query,
            {
                $lookup: {
                    "from": "categories",
                    "localField": "categoryObjId",
                    "foreignField": "_id",
                    "as": "categoryData"
                }},
            ])
        if (get) {
            return get;
        } else {
            return false;
        }
    }
    catch(err){
        return err
    }
}


module.exports = paperModels