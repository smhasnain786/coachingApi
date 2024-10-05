const authModel = require("../models/authmodels")
const R = require("../utils/responseHelper")
const bcrypt = require("../utils/bcrypt")

const profile = {}

profile.updateProfile = async(req,res,next)=>{
    try{
    let data = {
        ...req.body,
    }
    if(req.file && req.file.filename){
        data.profileIcon = req.file.filename
    }
    else{
        data.profileIcon = req.body.profileIcon
    }
        let add = await authModel.profileupdate(req.doc.userId,data)
        return R(res,true,"Data updated successfully!!",{},200)
    }catch(error){
        next(error)
    }
}


profile.changePassword = async (req,res,next) => {
    try{
        let val = await authModel.getUserbyId(req.doc.userId);
        const compare = await bcrypt.passwordComparision(
            req.body.oldPassword,
            val.password
        );
        console.log("comparepassword",compare)
        if (compare) {
            const password = await bcrypt.passwordEncryption(req.body.newPassword);
            const insData = await authModel.changePassword(req.doc.userId, password);
            if (insData) {
                return R(res,true,"Password changed successfully",{},200)
            }
        } else {
            return R(res,false,"Invalid Password!!",{},403)
        }
    }catch(error){
        next(error)
    }
   
};


profile.showProfile = async(req,res,next)=>{
    try{
        let add = await authModel.showprofile(req.doc.userId)
        return R(res,true,"Data found successfully",add,200)
    }catch(error){
        next(error)
    }
   
}
profile.updateEmailAndPassword = async(req,res,next)=>{
    try{
        let check = await authModel.checkAvailablityWithoutASpecificUser(req.doc.userId,req.body.emailId,req.body.mobileNumber)
        if(check?.length>0){
            return R(res,false,"Email or Mobile number already exist",{},403)
        }
        let add = await authModel.updateemailandmobile(req.doc.userId,req.body)
        return R(res,true,"Data updated successfully",{},200)
    }catch(error){
        next(error)
    }
    
}
module.exports = profile