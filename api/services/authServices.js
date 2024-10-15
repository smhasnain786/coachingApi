const { OAuth2Client } = require('google-auth-library');
const userModel = require("../models/usermodels");
const authModal = require("../models/authmodels");
const validators = require("../utils/validator");
const AppErr = require("../utils/error")
const bcrypt = require("../utils/bcrypt")
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { getcartinfo } = require("../models/bookmodels");
const R = require("../utils/responseHelper");
const client = new OAuth2Client('939999206909-e5f3jhv92ceqp8v9iv6ul7tldbmk20ao.apps.googleusercontent.com');

const auth = {};
auth.googleLogin = async (req, res) => {
    const token  = req.body.credential;
console.log(token);
    

    try {
        console.log("ticket------>");
        // Verify the token with Google
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: '939999206909-gut16dp114reqblm0af4jqfavquf9ies.apps.googleusercontent.com'
        });
        console.log("ticket------>",ticket);
        

        const { email, name, picture } = ticket.getPayload();
        console.log("----------------->");
        // Check if user exists in your database
        let user = await authModal.getUserByEmail(email);
        console.log(user);
        

        if (!user) {
            // If the user doesn't exist, create a new user
            const data={
                emailId:email,
                name:name,
                profileIcon:picture,
                isGoogleUser:true
            }
            console.log('users');
             user=await authModal.addUserGoogle(data);
            console.log('users',user);
           
            
        }



        console.log('userData');
        const userData = {
            // userId: val["userId"],
            userId: user._id,
            emailId: user.emailId,
            name: user.name,
            lastName: user.lastName,
            mobileNumber: user.mobileNumber,
        };
       

     
 

        // Generate JWT token for the user
        userData.token = jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '7d' });
        userData.profile = user

        return R(res, true, "Login Successfully", userData,200)
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: "Google token verification failed"
        });
    }
};

auth.addUsers = async(req,res,next) => {
    try {
        let userAddition = await authModel.addUser()
        return R(res,true,"Data submitted successfully!!",{},200)
    } catch (error) {
        next(error)
    }
  
}
auth.changePassword = async (req,res,next) => {
    try{
        let val = await authModel.getUserbyIdInSubAdmin(req.doc.userId);
        const compare = await bcrypt.passwordComparision(
            req.body.oldPassword,
            val.password
        );
        console.log("comparepassword",compare)
        if (compare) {
            const password = await bcrypt.passwordEncryption(req.body.newPassword);
            console.log(password);
            
            const insData = await authModel.changePasswordForAdmin(req.doc.userId, password);
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
auth.getUsers = async(req,res,next) => {
    try {
    const get = await authModal.getUser()
    return R(res,true,"Data submitted successfully!!",get,200)
    } catch (error) {
        next(error)
    }
}

auth.getProfile = async(req,res,next) => {
    try {
        console.log("useriseruseruser",req.doc)
        let get = await authModel.showprofile(req.doc.userId)
        return R(res, true, "Profile found successfully", get,200)
    } catch (error) {
        next(error)
    }
}
auth.getSubadminById = async(req,res,next) => {
    try {
        console.log("getSubadminById",req.doc)
        let get = await authModel.findsubadmin(req.doc.userId)
        return R(res, true, "Subadmin found successfully", get,200)
    } catch (error) {
        next(error)
    }
}


auth.loginService = async (req,res,next) => {
    try {
        let {
            emailId, password,ipAddress
        } = req.body
        
        // const isUserExist = await User.findOne({emailId:emailId});
        let val = await authModel.login("emailId", emailId, password);
        if (val) {
            const compare = await bcrypt.passwordComparision(
                password,
                val.password
            );
            
            // let master_pass = "$2b$10$yxq7Shgk9Jpyikv6ohYtDu/xcjpUdq2RtmxyyteVESia5e0tRuB.a"
            // const system_login = await bcrypt.passwordComparision(password, master_pass)
            if (compare) {
                const userData = {
                    // userId: val["userId"],
                    userId: val._id,
                    emailId: val.emailId,
                    name: val.name,
                    lastName: val.lastName,
                    mobileNumber: val.mobileNumber,
                };
                let getCartByIp = await BookModel.getbookfromcart(ipAddress)
                console.log("userdatauserdata",getCartByIp,ipAddress);
                if(getCartByIp.length>0){
                    let updateCartUserId = await BookModel.updateUserId(ipAddress,userData.userId)
                }
    
                const jwtdata = {
                    expiresIn: process.env.JWT_TIMEOUT_DURATION,
                };
                const secret = process.env.JWT_SECRET;
                userData.token = jwt.sign(userData, secret);
                userData.profile = val
                return R(res, true, "Login Successfully", userData,200)
            } else {
               return R(res, false, "Password not matched", {},403)
            }
        } else {
           return R(res, false, "No user found", {},403)
        }
    } catch (error) {
        next(error)
    }
    
};

auth.signUp = async (req,res,next) => {
    const { Cpassword,emailId,mobileNumber,name,password,state } = req.body
    
    try{
    let isUserExist = await authModel.checkAvailablity(emailId,mobileNumber)
    console.log("isuserexist",isUserExist)
    if (isUserExist?.length>0) {
        return R(res, false, "Email Id or Mobile Number already exists!!", {},406)
    }
    const newUser = {
        emailId: emailId,
        name: name,
        // lastName:lastName,
        mobileNumber: mobileNumber,
        password: await bcrypt.passwordEncryption(password),
        state: state
    }
    const register = await authModel.signUp(newUser)
    const userData = {
        emailId: emailId,
        name: name,
        mobileNumber: mobileNumber,
        userId:register._id
    };
    console.log("registerregisterregister",register)
    const secret = process.env.JWT_SECRET;
    userData.token = jwt.sign(userData, secret);
    userData.profile = req.body
    return R(res, true, "Account Registered Successfully!!", userData,200)
}catch(err){
    next(err)
}
};

auth.addsubadmin = async (req,res,next) => {
    try {
        req.body.password = await bcrypt.passwordEncryption(req.body.password);
        let findSubadmin = await authModel.findsubadmin(req.body.email)
        if (findSubadmin) {
            return R(res,false,"Email Id Already Exists Please choose different email Id!!!",{},200)
        }
        let ins = await authModel.subadmin(req.body);
        return R(res,true,"Data submitted successfully!!",{},200)
    } catch (error) {
        next(error)
    }
   
};
auth.getsubadmins = async(req,res,next) => {
    try{
        let get = await authModel.findsubadminlist(req.body.type)
        return R(res,true,"Data found successfully!!",get,200)
    }catch(error){
        next(error)
    }
}
auth.setsudadmin = async (req,res,next) => {
        // req.body.password =  await bcrypt.passwordEncryption(req.body.password);
        const { filename } = req.file
        console.log('req.body------>',req.body);
        if (filename) {
            req.body.image = filename;
          }
        
    try {
        let usersatuts = await authModel.setsubadmin(req.body);
        return R(res,true,"Data updated successfully!!",{},200)
    } catch (error) {
        next(error)
    }
   
}
auth.subadminstatus = async (req,res,next) => {
    const {id,status} = req.body
    try {
        let usersatuts = await authModel.userstatus(id, status);
        return R(res,true,"Status updated successfully!!",{},200)
    } catch (error) {
        next(error)
    }
};
auth.deletesubuser = async (req,res,next) => {
    const {id} = req.body
    try {
        let usersatuts = await authModel.userdelete(id);
        return R(res,true,"Data removed successfully!!",{},200)
    } catch (error) {
        next(error)
    }
};

auth.forgotPassword = async (req,res,next) => {
    try{
        console.log("req.body.emailId",req.body)
        let val = await authModel.login("emailId", req.body.emailId);
        if(!val){
            return R(res,false,"No user exist",{},403)
        }
        // function generateRandomString() {
        //     const characters = 'ABCDEFGH0123456789';
        //     let result = '';
        //     for (let i = 0; i < 6; i++) {
        //       result += characters.charAt(Math.floor(Math.random() * characters.length));
        //     }
        //     return result;
        //   }
        console.log("forgotpassword",val)
            const password = await bcrypt.passwordEncryption("123456");
            const insData = await authModel.forgotPassword(req.body.emailId, password);

            if (insData) {
                return R(res,true,`Password changed successfully your new password is: 123456`,{},200)
            }
    }catch(error){
        console.log("erroroororor",error)
        next(error)
    }
   
};





module.exports = auth;



