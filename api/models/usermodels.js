const db = require("../utils/dbConn");
const mongoose = require("mongoose");
const R = require("../utils/responseHelper");
const Schema = mongoose.Schema;
// const apiResponse = require("../utils/apiResponses");
// const AppErr = require("../utils/error");
//const { x } = require("pdfkit");
let ObjectId = require("mongodb").ObjectID;
userModel = {};
const user = mongoose.Schema({
    name: { type: String },
    email: { type: String },
});

userModel.addUser = async()=> {
    let data ={
        name:"ansari",
        email:"ansari@gmail.com"
    } 
    const add = await db.connectDb("users",user)
    const addUser = await add.create(data)
    const count =await add.countDocuments({})
    console.log("count",count)
    return count
}
userModel.getUser = async()=> {
    try{
    const add = await db.connectDb("users",user)
    const getUser = await add.find({})
    R(res,true,"Users found successfully",getUser,200)
}catch(error){
    next(error)
}
}


module.exports = userModel;


