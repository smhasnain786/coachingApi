const db = require("../utils/dbConn");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const apiResponse = require("../utils/apiResponses");
// const AppErr = require("../utils/error");
//const { x } = require("pdfkit");
let ObjectId = require("mongodb").ObjectID;

ticketModels={}


const ticketSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: { type: String, enum: ['open', 'in-progress', 'resolved'], default: 'open' },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    createdBy: { type:String},
    createdByRole: { type: String, enum: ['client', 'vendor'] },
    assignedTo: { type:String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    resolvedAt: Date
  });

  ticketModels.addSupport = async(data) =>{
    const ticketsAdd = await db.connectDb("tickets",ticketSchema);
    let insData = await ticketsAdd.create(data);
    if (insData) {
        return true;
    } else {
        return false
};
}
  ticketModels.getallsupportrequest = async(data) =>{
    const ticketsFind = await db.connectDb("tickets",ticketSchema);
    let insData = await ticketsFind.find();
    console.log(insData);
    
    if (insData) {
        return insData;
    } else {
        return false
};
}
  ticketModels.getAllSupportRequestByUserId = async(data) =>{
    const ticketsFind = await db.connectDb("tickets",ticketSchema);
    let insData = await ticketsFind.find({createdBy:data.userId});
    console.log(insData);
    
    if (insData) {
        return insData;
    } else {
        return false
};
}

// typingModels.getTyping = async(data) =>{
//     const fileAdd = await db.connectDb("typings",typingSchema);
//     let insData 
//     if(data.role == "admin"){
//         insData = await fileAdd.find();
//     }else{
//         insData = await fileAdd.find({userId:data.userId});
//     }
//     if (insData) {
//         return insData;
//     } else {
//         return false
// };
// }
module.exports = ticketModels
