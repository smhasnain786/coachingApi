const db = require("../utils/dbConn");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const apiResponse = require("../utils/apiResponses");
// const AppErr = require("../utils/error");
//const { x } = require("pdfkit");
let ObjectId = require("mongodb").ObjectID;

currentAffairs={}


const currentAffairsSchema = mongoose.Schema(
    {
        userId:{type:String},
        type:{type:String},
        fileType:{type:String},
        file:{type:String},
        range:{type:String},
        plan:{type:String},
        date:{type: Date, default: Date.now}
    },
    { timestamps: true }
);

currentAffairs.addcurrentAffairsFile = async(data) =>{
        const fileAdd = await db.connectDb("currentaffairs", currentAffairsSchema);
        let insData = await fileAdd.create(data);
        if (insData) {
            return true;
        } else {
            return false
    };
}

currentAffairs.getcurrentAffairsFile = async(data) =>{
    const fileAdd = await db.connectDb("currentaffairs", currentAffairsSchema);
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

currentAffairs.updatecurrentAffairsFile = async(data,id) =>{
    console.log("body,file,id",data,id);
    const fileAdd = await db.connectDb("currentaffairs", currentAffairsSchema);
    let insData = await fileAdd.updateOne({_id:id},{$set:data});
    if (insData) {
        return true;
    } else {
        return false
    };
}
currentAffairs.deletecurrentAffairsFile = async(id) =>{
    const fileAdd = await db.connectDb("currentaffairs", currentAffairsSchema);
    let insData = await fileAdd.deleteOne({_id:id});
    if (insData) {
        return true;
    } else {
        return false
    };
}
currentAffairs.findfiles = async(data)=> {
    const fileAdd = await db.connectDb("currentaffairs", currentAffairsSchema);
    let insData
    let query = data.type == "Daily" ? { $dateToString: { format: "%d-%m-%Y", date: "$date" } }:"$range"
    console.log("datadatdatdatdatdatda====>>>>",data);
    if(data.fromDate && data.toDate && data.fileType){
        insData =  await fileAdd.aggregate([
              {
                $match: {
                     type: data.type,
                     fileType: data.fileType,
                    date: {
                      $gte: new Date(data.fromDate),
                      $lte: new Date(data.toDate)
                    }
                  }
                },
                {
                  $group: {
                    _id: query,
                    documents: { $push: "$$ROOT" }
                  }
                },
              ]);
    }
    else{
        insData = await fileAdd.aggregate([
            {
              $match: {
                type: data.type,
                // file: { $ne: "file_to_exclude.pdf" } // Exclude specific file
              }
            },
            {
              $group: {
                _id: query,
                documents: { $push: "$$ROOT" }
              }
            },
            {
              $project: {
                _id: 1, // Keep the "_id" (range) field
                documents: { $map: { input: "$documents", as: "doc", in: { // Exclude the specific field
                  type: "$$doc.type",
                  fileType: "$$doc.fileType",
                  range: "$$doc.range",
                  file:"$$doc.file",
                  date: "$$doc.date",
                  createdAt: "$$doc.createdAt",
                  updatedAt: "$$doc.updatedAt",
                  __v: "$$doc.__v"
                } } }
              }
            },
            { $sort: { _id: -1 } }
          ]);
        }   
      
    if (insData) {
        return insData;
    } else {
        return false
    };

}
module.exports = currentAffairs


