const db = require("../utils/dbConn");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const apiResponse = require("../utils/apiResponses");
// const AppErr = require("../utils/error");
//const { x } = require("pdfkit");
let ObjectId = require("mongodb").ObjectID;

contactModel = {}

const contactSchema = mongoose.Schema({
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    message: { type: String },
    date: { type: Date }
})

contactModel.addContact = async (data) => {
    try {
        let category = await db.connectDb("contacts", contactSchema);
        let addCategory = await category.create(data)
        if (addCategory) {
            return addCategory
        }
    }
    catch (err) {
        return err
    }
}

module.exports = contactModel
