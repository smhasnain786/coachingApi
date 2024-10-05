const socialMediaModel = require("../models/socialmediamodels")
const R = require("../utils/responseHelper")

const socialMediaService = {}



socialMediaService.addSocialMediaUrl = async(req,res,next)=>{
    try {
        const {facebook,instagram,whatsapp,linkedin,youtube,twitter,telegram} = req.body
    let datas = {
        userId:req.doc.userId,
        facebook:facebook,
        instagram:instagram,
        whatsapp:whatsapp,
        linkedin:linkedin,
        youtube:youtube,
        twitter:twitter,
        telegram:telegram
    }
    let add = await socialMediaModel.addsocialmedia(datas)
    return R(res,true,"Data added successfully",{},200)
    } catch (error) {
        next(error)
    }
}
socialMediaService.getSocialMedia = async(req,res,next)=>{
    try{
        let get = await socialMediaModel.getsocialmedia()
        return R(res,true,"Data found successfully!!",get,200)
    }catch(error){
        next(error)
    }
    
}
socialMediaService.updateSocialMediaById = async(req,res,next)=>{
    try {
        const {facebook,instagram,whatsapp,linkedin,youtube,twitter,telegram} = req.body
        let datas = {
            facebook:facebook,
            instagram:instagram,
            whatsapp:whatsapp,
            linkedin:linkedin,
            youtube:youtube,
            twitter:twitter,
            telegram:telegram
        }
        let update = await socialMediaModel.updatesocialmedia(req.body.id,datas)
        return R(res,true,"Data updated successfully",{},200)
    } catch (error) {
        next(error)
    }
}
socialMediaService.deleteSocialMediaById = async(req,res,next)=>{
    try {
        const {id} = req.body
        let remove = await socialMediaModel.deletesocialmedia(id)
        return R(res,true,"Data removed successfully",{},200)
    } catch (error) {
        next(error)
    }
   
}
module.exports = socialMediaService