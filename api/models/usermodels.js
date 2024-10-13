const db = require("../utils/dbConn");
const mongoose = require("mongoose");
const R = require("../utils/responseHelper");
const Schema = mongoose.Schema;
// const apiResponse = require("../utils/apiResponses");
// const AppErr = require("../utils/error");
//const { x } = require("pdfkit");
let ObjectId = require("mongodb").ObjectID;
userModel = {};
const user =mongoose.Schema(
    {
        name: { type: String },
        // lastName: { type: String, required: false },
        emailId: { type: String },
        gender: { type: String,default: "" },
        mobileNumber: { type: String,default: "" },
        dob: { type: String,default: "" },
        address1: { type: String,default: "" },
        profileIcon: { type: String,default: "" },
        address2: { type: String ,default: ""},
        city: { type: String,default: "" },
        pincode: { type: String ,default: ""},
        pMode: { type: String,default: "" },
        country: { type: String,default: "" },
        state: { type: String,default: "" },
        password: { type: String},
        // client_ip: { type: String, default: "" }, //1 verify, 2 reject, 0 pending
        userType: { type: Number, default: 0, enum: [0, 1] }, // 1 for admin
        isGoogleUser: { type: Number, default: false }, // 1 for admin
    },
    { timestamps: true }
);

userModel.addUser = async () => {
    let data = {
        name: "ansari",
        email: "ansari@gmail.com"
    }
    const add = await db.connectDb("users", user)
    const addUser = await add.create(data)
    const count = await add.countDocuments({})
    console.log("count", count)
    return count
}
userModel.addUserGoogle = async (dataas) => {
    const data = {
        name: dataas.name,
        emailId: dataas.emailId, // Ensure this matches the schema field
        profileIcon: dataas.profileIcon, // Save Google profile picture
        isGoogleUser: true ,// Set to true since this is a Google user
        gender:"",
        mobileNumber: "",
        dob:"",
        address1: "",
        address2: "",
        city: "",
        pincode: "",
        pMode:"",
        country:"",
        state: "",
        password: "",
        // client_ip: { type: String, default: "" }, //1 verify, 2 reject, 0 pending
        userType: 0, // 1 for admin
    };

    try {
        const add = await db.connectDb("users", user); // Ensure correct reference to user schema
        console.log('add',add);
        
        const addUser = await add.create(data);
        console.log("adduser",addUser);
        
        return addUser;
    } catch (error) {
        throw new Error("Failed to add user: " + error.message); // Handle error
    }
};

userModel.getUser = async () => {
    try {
        const add = await db.connectDb("users", user)
        const getUser = await add.find({})
        R(res, true, "Users found successfully", getUser, 200)
    } catch (error) {
        next(error)
    }
}
userModel.getUserByEmail = async (email) => {
    try {
        const add = await db.connectDb("users", user)
        const getUser = await add.findOne({ email });
        return getUser; // Return the found user
    } catch (error) {
        next(error)
    }
}


module.exports = userModel;


