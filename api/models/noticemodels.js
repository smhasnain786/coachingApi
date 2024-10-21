const db = require("../utils/dbConn");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const apiResponse = require("../utils/apiResponses");
// const AppErr = require("../utils/error");
//const { x } = require("pdfkit");
let ObjectId = require("mongodb").ObjectID;

noticeModel={}
const orderSchema = new mongoose.Schema({
    notice: {
      type: String,
      required: true,
    },
  
    createdAt: {
      type: Date,
      default: Date.now,
    }
  });
  noticeModel.createNotice= async(data) => {
    try{
        let order =await db.connectDb("noticeboard",orderSchema);
        let addorder = await order.create(data)
        if(addorder){
            return addorder
        }
    }
    catch(err){
        return err
    }
}
  noticeModel.getNotice= async(data) => {
    try{
        let order =await db.connectDb("noticeboard",orderSchema);
        let addorder = await order.find()
        if(addorder){
            return addorder
        }
    }
    catch(err){
        return err
    }
}
  noticeModel.deleteNotice= async(id) => {
    try{
        let order =await db.connectDb("noticeboard",orderSchema);
        let addorder = await order.deleteOne({_id:id})
        if(addorder){
            return addorder
        }
    }
    catch(err){
        return err
    }
}
module.exports = noticeModel
