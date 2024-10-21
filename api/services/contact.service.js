const contactModels = require("../models/contactmodels")
const R = require("../utils/responseHelper")


const contactService={}
contactService.addContact = async(req,res,next)=>{
    try {
        let add = await contactModels.addContact(req.body)
        return R(res,true,"Data added successfully!!",add,200)
    } catch (error) {
        next(error)
    }
   
}


module.exports = contactService