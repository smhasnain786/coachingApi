const db = require("../utils/dbConn");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const apiResponse = require("../utils/apiResponses");
// const AppErr = require("../utils/error");
//const { x } = require("pdfkit");
let ObjectId = require("mongodb").ObjectID;

testSeriesModel={}


const testSeriesSchema = mongoose.Schema(
    {
        userId:{type:String},
        categoryId:{type:String},
        fileType:{type:String},
        subject:{type:String},
        file:{type:String},
        plan:{type:String},
        releaseDate:{type:String},
        date:{type:Date}
    },
    { timestamps: true }
);

testSeriesModel.addTestSeries = async(data) =>{
        const fileAdd = await db.connectDb("testseries",testSeriesSchema);
        let insData = await fileAdd.create(data);
        if (insData) {
            return true;
        } else {
            return false
    };
}

testSeriesModel.getTestSeriesAsQuery = async(data) =>{
    const testSeries =  await db.connectDb("testseries", testSeriesSchema);
    let insData
    if(data && data.categoryId && data.fromDate && data.toDate && data.fileType){
    console.log("firstif===>>>",data);

            insData =  await testSeries.aggregate([
                  {
                    $match: {
                         fileType: data.fileType,
                         categoryId:data.categoryId,
                        createdAt: {
                          $gte: new Date(data.fromDate),
                          $lte: new Date(data.toDate)
                        }
                      }
                    },
                    {
                      $group: {
                        _id: "$releaseDate",
                        documents: { $push: "$$ROOT" }
                      }
                    },
                    { $sort: { _id: -1 } }
                  ])
    }
    else{
    console.log("secondif===>>>",data);
    let queryArray
    if(data?.categoryId){
      queryArray = [
        {
          $match: {
            categoryId: data.categoryId,
            // file: { $ne: "file_to_exclude.pdf" } // Exclude specific file
          }
        },
        {
          $group: {
            _id: "$releaseDate",
            documents: { $push: "$$ROOT" }
          }
        },
        { $sort: { _id: -1 } }
      ]
    }
    else{
      queryArray = [
        {
          $group: {
            _id: "$releaseDate",
            documents: { $push: "$$ROOT" }
          }
        },
        { $sort: { _id: -1 } }
      ]
    }
      insData = await testSeries.aggregate(queryArray);
      } 

    if (insData) {
        return insData;
    } else {
        return false
    };
}

testSeriesModel.getTestSeries = async(data) =>{
  const testSeries =  await db.connectDb("testseries", testSeriesSchema);
  let insData
        if(data.role == "admin"){
          insData = await testSeries.aggregate([
            { $addFields: { "categoryObjId": { "$toObjectId": "$categoryId" } } },
            {
              $lookup: {
                from: "categories",
                localField: "categoryObjId",
                foreignField: "_id",
                as: "categoryData"
              }
            }
          ]);
        }else{
          insData = await testSeries.aggregate([
            {$match:{userId:data.userId}},
            { $addFields: { "categoryObjId": { "$toObjectId": "$categoryId" } } },
            {
              $lookup: {
                from: "categories",
                localField: "categoryObjId",
                foreignField: "_id",
                as: "categoryData"
              }
            }
          ]);
        }    
  if (insData) {
      return insData;
  } else {
      return false
  };
}

testSeriesModel.updateTestSeries = async(data,id) =>{
    const fileAdd =  await db.connectDb("testseries", testSeriesSchema);
    let insData = await fileAdd.updateOne({_id:id},{$set:data});
    if (insData) {
        return true;
    } else {
        return false
    };
}
testSeriesModel.deleteTestSeries = async(id) =>{
    const fileAdd =  await db.connectDb("testseries", testSeriesSchema);
    let insData = await fileAdd.deleteOne({_id:id});
    if (insData) {
        return true;
    } else {
        return false
    };
}
module.exports = testSeriesModel


