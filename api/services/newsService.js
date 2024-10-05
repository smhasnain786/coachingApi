const newsModel = require("../models/newsmodels")
const R = require("../utils/responseHelper")

const news = {}



news.addNews = async(data)=>{
    console.log("addnews",data)
    let add = await newsModel.addNews(data)
    return add
}
news.getNews = async()=>{
    let add = await newsModel.getNews()
    return add
}
news.updateNewsById = async(data)=>{
    let add = await newsModel.updateNews(data)
    return add
}
news.deleteNewsById = async(data)=>{
    let add = await newsModel.deleteNews(data.id)
    return add
}
module.exports = news