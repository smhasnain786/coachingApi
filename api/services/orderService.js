const orderModels = require("../models/orderModels")
const R = require("../utils/responseHelper")
const IP = require('ip');
const OrderModel = {}



OrderModel.addOrder = async(req,res,next)=>{
    const {userId} = req.doc
 

    try {
        req.body.userId = userId
        let add = await orderModels.createOrder(req.body)
        console.log(add);
        
        return R(res,true,"Data added successfully!!",{},200)
    } catch (error) {
        next(error)
    }
   
}
OrderModel.getOrdersAll = async(req,res,next)=>{
    try {
        let add = await orderModels.allOrders(req.doc)
        return R(res,true,"Data found successfully!!",add,200)
    } catch (error) {
        next(error)
    }
   
}
OrderModel.getOrdersByUserId= async(req,res,next)=>{
    try {
        let add = await orderModels.ordersByUserId(req.doc)
        return R(res,true,"Data found successfully!!",add,200)
    } catch (error) {
        next(error)
    }
   
}
OrderModel.getOrdersBySubadminId= async(req,res,next)=>{
    try {
        let add = await orderModels.ordersBySubadminId(req.doc)
        return R(res,true,"Data found successfully!!",add,200)
    } catch (error) {
        next(error)
    }
   
}
// BookModel.updatecategoryOfBookById = async(req,res,next)=>{
//     try {
//         const {id,categoryName} = req.body
//         let add = await bookModels.updateCategory(id,categoryName)
//         return R(res,true,"Data updated successfully!!",{},200)
//     } catch (error) {
//         next(error)
//     }
   
// }
// BookModel.deletecategoryOfBookById = async(req,res,next)=>{
//     const {id} = req.body
//     try {
//         let add = await bookModels.deleteCategory(id)
//         return R(res,true,"Data removed successfully!!",{},200)
//     } catch (error) {
//         next(error)
//     }
    
// }
// BookModel.changeCategoryStatus = async(req,res,next)=>{
//     try {
//         let add = await bookModels.changeStatus(req.body)
//         return R(res,true,"Status updated successfully!!",{},200)
//     } catch (error) {
//         next(error)
//     }
 
// }
// BookModel.changeBookStatus = async(req,res,next)=>{
//     try {
//         let add = await bookModels.changeStatusOfBook(req.body)
//         return R(res,true,"Status updated successfully!!",{},200)
//     } catch (error) {
//         next(error)
//     }
    
// }
// BookModel.changePosterStatus = async(req,res,next)=>{
//     try {
//         let add = await bookModels.changeStatusOfPoster(req.body)
//         return R(res,true,"Status updated successfully!!",{},200)
//     } catch (error) {
//         next(error)
//     }
   
// }
// BookModel.addBookDetails = async(req,res,next)=>{
//     try {
//         const {userId} = req.doc
//         console.log("body,file",req.body,req.files)
//         let mrp = typeof(req.body.MRP) == "string"? parseFloat(req.body.MRP):req.body.MRP
//         let sellingPrice = typeof(req.body.sellingPrice) == "string"? parseFloat(req.body.sellingPrice):req.body.sellingPrice
//         let discount = mrp-sellingPrice
//         discount= (discount/mrp)*100
//         let bookDetails = {
//             userId:userId,
//             categoryId:req.body.categoryId,
//             itemType:req.body.itemType,
//             bookName:req.body.bookName,
//             bookIcon:req?.files['bookIcon'][0]?.filename?req.files['bookIcon'][0].filename:undefined,
//             samplePdf:req?.files['samplePdf'][0]?.filename?req.files['samplePdf'][0].filename:undefined,
//             MRP:req.body.MRP,
//             chapterCount:req.body.chapterCount,
//             ISBN:req.body.ISBN,
//             author:req.body.author,
//             bookCode:req.body.bookCode,
//             type:req.body.type,
//             language:req.body.language,
//             sellingPrice:req.body.sellingPrice,
//             features:req.body.features,
//             discount:discount,
//         }
//         console.log("chapterCountchapterCount",bookDetails)
//         let add = await bookModels.addBookDetails(bookDetails)
//         return R(res,true,"Data added successfully!!",{},200)
//     } catch (error) {
//         next(error)
//     }
// }

// BookModel.getBooks = async(req,res,next)=>{
//     try {
//         let add = await bookModels.getBookLists(req.doc)
//         return R(res,true,"Data found successfully!!",add,200)
//     } catch (error) {
//         next(error)
//     }
   
// }
// BookModel.updateBookDetails = async(req,res,next)=>{
//     try {
//         const {
//             categoryId,itemType,bookName,MRP,ISBN,author,chapterCount,bookCode,type,language,sellingPrice,features
//         } =  req.body
//         let discounts =typeof(MRP) == "string" || typeof(sellingPrice) == "string"?parseFloat(MRP)-parseFloat(sellingPrice):MRP-sellingPrice    
//         discounts= (discounts/MRP)*100
//         console.log("file",discounts)

//         let bookDetails = {
//             categoryId:categoryId, 
//             itemType:itemType,
//             bookName:bookName,
//             MRP:Number(MRP),
//             ISBN:ISBN,
//             author:author,
//             bookCode:bookCode,
//             type:type,
//             chapterCount:Number(chapterCount),
//             language:language,
//             sellingPrice:Number(sellingPrice),
//             discount:discounts,
//             features:features,
//         }

//         if(req?.files['bookIcon'] && req?.files['bookIcon'][0]?.filename){
//             bookDetails.bookIcon = req.files['bookIcon'][0].filename
//         }
//         else{
//             bookDetails.bookIcon = req.body.bookIcon
//         }
//         if(req?.files['samplePdf'] && req?.files['samplePdf'][0]?.filename){
//             bookDetails.samplePdf = req.files['samplePdf'][0].filename
//         }
//         else{
//             bookDetails.samplePdf = req.body.samplePdf
//         }
//         console.log("bookdetailsuploadedsuccessfullyssssssssss",req.files['samplePdf'])
//         let add = await bookModels.updateBookDetailsById(req.body._id,bookDetails)
//         return R(res,true,"Data updated successfully!!",{},200)
//     } catch (error) {
//         next(error)
//     }
   
// }
// BookModel.deleteBookDetails = async(req,res,next)=>{
//     try {
//         const {id} = req.body
//         let add = await bookModels.deleteBookDetails(id)
//         return R(res,true,"Data removed successfully!!",{},200)
//     } catch (error) {
//         next(error)
//     }
  
    
// }

// BookModel.addBookFiles = async(req,res,next)=>{
//     try {
//         const {fileType,chapter,bookId} = req.body
//         const { filename } = req.file
//         let data = {
//             userId:req.doc.userId,
//             fileType:fileType,
//             bookId:bookId,
//             file:filename,
//             chapter:chapter
//         }
//         let check = await bookModels.checkBookFileAvailable(data)
//         if(check){
//         return R(res,false,"Data already available!!",{},403)
//         }
//         let add = await bookModels.addBookFiles(data)
//         return R(res,true,"Data added successfully!!",{},200)
//     } catch (error) {
//         next(error)
//     }
    
// }
// BookModel.getBookFiles = async(req,res,next)=>{
//     try {
//         let get = await bookModels.getBookFiles(req.doc)
//         return R(res,true,"Data found successfully!!",get,200)
//     } catch (error) {
//         next(error)
//     }
   
// }
// BookModel.updateBookFiles = async(req,res,next)=>{
//     try {
//         let details = {
//             bookId:req.body.bookId,
//             fileType:req.body.fileType,
//             chapter:req.body.chapter
//         }
//         if(req?.file?.filename){
//             details.file = req.file.filename
//         }
//         else{
//             details.file = req.body.file
//         }
//         let add = await bookModels.updateBookFiles(details,req.body.id)
//         return R(res,true,"Data updated successfully!!",{},200)
//     } catch (error) {
//         next(error)
//     }
  
// }
// BookModel.removeBookFiles = async(req,res,next)=>{
//     try {
//         const {id} = req.body
//         let add = await bookModels.deleteBookFiles(id)
//         return R(res,true,"Data removed successfully!!",{},200)
//     } catch (error) {
//         next(error)
//     }
   
// }

// BookModel.addPoster = async(req,res,next)=>{
//     try {

//         // let discount = req.body.mrp-req.body.sellingPrice
//         // discount= (discount/req.body.mrp)*100
//         let bookDetails = {
//             userId:req.doc.userId,
//             categoryId:req.body.categoryId,
//             posterIcon:req.file.filename
//         }
//         let add = await bookModels.addPosterImage(bookDetails)
//         return R(res,true,"Data added successfully!!",{},200)
//     } catch (error) {
//         next(error)
//     }
   
// }

// BookModel.getPoster = async(req,res,next)=>{
//     try {
//         let get = await bookModels.getPosters(req.doc)
//         return R(res,true,"Data found successfully!!",get,200)
    
//     } catch (error) {
//         next(error)
//     }
// }
   

// BookModel.updatePoster = async(req,res,next)=>{
//     try {
//         let poster = {
//             categoryId:req.body.categoryId
//         }
//         if(req.file && req.file.filename){
//             poster.posterIcon = req.file.filename
//         }
//         else{
//             poster.posterIcon = req.body.bookIcon
//         }
//         console.log("bookdetailsuploadedsuccessfully",poster)
//         let update = await bookModels.updatePostersById(req.body._id,poster)
//         return R(res,true,"Data updated successfully!!",{},200)
//     } catch (error) {
//         next(error)
//     }
    
// }
// BookModel.deletePoster = async(req,res,next)=>{
//     try {
//         const {id} = req.body
//         let remove = await bookModels.deletePosterById(id)
//         return R(res,true,"Data removed successfully!!",{},200)
//     } catch (error) {
//         next(error)
//     }
  
// }

// BookModel.getAllCategory = async(req,res,next) => {
//     try {
//         let get = await bookModels.getallcategory()
//         return R(res,true,"Data found successfully",get,200)
//     } catch (error) {
//         next(error)
//     }
   
// }
// BookModel.getAllBooks = async(req,res,next) => {
//     try {
//         let get = await bookModels.getallbooks()
//         return R(res,true,"Data found successfully",get,200)
//     } catch (error) {
//         next(error)
//     }
   
// }
// BookModel.getBookContentById = async(req,res,next) => {
//     try {
//         let get = await bookModels.getBookContentById(req.params.id)
//         return R(res,true,"Data found successfully",get,200)
//     } catch (error) {
//         next(error)
//     }
// }
// BookModel.getBookContentFileById = async(req,res,next) => {
//     try {
//         let get = await bookModels.getBookContentFileById(req.body)
//         return R(res,true,"Data found successfully",get,200)
//     } catch (error) {
//         next(error)
//     }
// }
// BookModel.getAllBooksByCategoryId = async(req,res,next) => {
//     try {
//         let get = await bookModels.getallbooksbycategoryId(req.body)
//         return R(res,true,"Data found successfully",get,200)
//     } catch (error) {
//         next(error)
//     }
    
// }
// BookModel.getAllPosters = async(req,res,next) => {
//     try {
//         let get = await bookModels.getallposters()
//         return R(res,true,"Data found successfully",get,200)
//     } catch (error) {
//         next(error)
//     }
   
// }
// BookModel.addNewsLetter = async(req,res,next) => {
//     try {
//         let get = await bookModels.newsLetterAdd(req.body)
//         return R(res,true,"Data added successfully",{},200)
//     } catch (error) {
//         next(error)
//     }
// }
// BookModel.getNewsLetter = async(req,res,next) => {
//     try {
//         let get = await bookModels.newsLetterGet(req.doc)
//         return R(res,true,"Data found successfully",get,200)
//     } catch (error) {
//         next(error)
//     }
// }
// BookModel.addBookReviews = async(req,res,next) => {
//     try {
//         let get = await bookModels.addbookreview(req.body)
//         return R(res,true,"Data added successfully",{},200)
//     } catch (error) {
//         next(error)
//     }
// }
// BookModel.getAllReveiw = async(req,res,next)=>{
//     try {
//         let add = await bookModels.getallreviews(req.doc)
//         return R(res,true,"Data found successfully!!",add,200)
//     } catch (error) {
//         next(error)
//     }
   
// }

// BookModel.changeStatus = async(req,res,next)=>{
//     try {
//         let add = await bookModels.changeStatusOfReview(req.body)
//         return R(res,true,"Status updated successfully!!",{},200)
//     } catch (error) {
//         next(error)
//     }
   
// }
// BookModel.addBookToCart = async(req,res,next)=>{
//     try{
//         const ipAddress = IP.address();
//         let data = {
//             ...req.body,
//             systemIp:ipAddress
//         }
//         if(req.doc.userId){
//             data.userId = req.doc.userId
//         }
//         let add = await bookModels.addbooktocart(data)
//         return R(res,true,"Data added successfully",{},200)
//     }catch(error){
//         next(error)
//     }
  
// }
// BookModel.getBookFromCart = async(req,res,next)=>{
//     try{
//         const ipAddress = IP.address();
//         let add = await bookModels.getbookfromcart(ipAddress)
//         return R(res,true,"Data found successfully",add,200)
//     }catch(error){
//         next(error)
//     }
   
// }
// BookModel.getCartInfo = async(req,res,next)=>{
//     try {
//         const ipAddress = IP.address();
//         let get = await bookModels.getcarttotalAmountAndQuentity({"systemIp":ipAddress})
//         return R(res,true,"Data found successfully",get,200)
//     } catch (error) {
//         next(error)
//     }
   
// }
// BookModel.getCartInfoByUserId = async(req,res,next)=>{
//     try {
//         let get = await bookModels.getcarttotalAmountAndQuentity({"userId":req.doc.userId})
//         return R(res,true,"Data found successfully",get,200)
//     } catch (error) {
//         next(error)
//     }
   
// }
// BookModel.getBookDetailsById = async(req,res,next)=>{
//     try {
//         let get = await bookModels.getbookdetailsbyid(req.body.id)
//         return R(res,true,"Data found successfully",get,200)
//     } catch (error) {
//         next(error)
//     }
 
// }
// BookModel.getBookfromCartByUserId = async(req,res,next)=>{
//     try{
//         let get = await bookModels.getbookfromcartbyuserId(req.doc.userId)
//         return R(res,true,"Data found successfully",get,200)
//     }catch(error){
//         next(error)
//     }
   
// }
// BookModel.removeItemFromCart = async(req,res,next)=>{
//     try {
//         let get = await bookModels.removefromcart(req.body.id)
//         return R(res,true,"Data removed successfully",{},200)
//     } catch (error) {
//         next(error)
//     }
   
// }
// BookModel.getAllCartDetails = async(req,res,next)=>{
//     try {
//         let get = await bookModels.getcartinfo()
//         return R(res,true,"Data found successfully!!",get,200)
//     } catch (error) {
//         next(error)
//     }
// }
// BookModel.setTitlesImage = async(req,res,next)=>{
//     try {
//         let data = {
//             userId:req.doc.userId,
//             title:req.body.title,
//             icon:req.file.filename
//         }
//         let findIdTitleExist = await bookModels.findIfTitleExist(data.title)
    
//         if(findIdTitleExist){
//               return R(res,false,"Title already exists!!",{},403)
//         }
//         let get = await bookModels.settitleimage(data)
//         return R(res,true,"Data submitted successfully!!",{},200)
//     } catch (error) {
//         next(error)
//     }
   
// }
// BookModel.getTitlesImage = async(req,res,next)=>{
//     try {
//         let get = await bookModels.gettitleimage()
//         return R(res,true,"Data found successfully",get,200)
//     } catch (error) {
//         next(error)
//     }
   
// }
// BookModel.updateTitlesImage = async(req,res,next)=>{
//     try {
//         let title = {
//             title:req.body.title
//         }
//         if(req.file && req.file.filename){
//             title.icon = req.file.filename
//         }
//         else{
//             title.icon = req.body.titleIcon
//         }
//         let update = await bookModels.udpatetitleimagebyid(req.body._id,title)
//         return R(res,true,"Data updated successfully!!",{},200)
//     } catch (error) {
//         next(error)
//     }
    
// }
// BookModel.deleteTitlesImage = async(req,res,next)=>{
//     try {
//         const {id} = req.body
//         let get = await bookModels.deletetitleimagebyid(id)
//         return R(res,true,"Data removed successfully!!",{},200)
//     } catch (error) {
//         next(error)
//     }
  
// }
// BookModel.addPromotionAndOffer = async(req,res,next)=>{
//     try {
//         let data = {
//             userId:req.doc.userId,
//             categoryId:req.body.categoryId,
//             icon:req.file.filename
//         }
//         let get = await bookModels.addpromotionandoffer(data)
//         return R(res,true,"Data added successfully!!",{},200)
//     } catch (error) {
//         next(error)
//     }
  
// }
// BookModel.getPromotionAndOffer = async(req,res,next)=>{
//     try {
//         let get = await bookModels.getpromotionandoffer()
//         return R(res,true,"Data found successfully",get,200)
//     } catch (error) {
//         next(error)
//     }
  
// }
// BookModel.updatePromotionAndOfferById = async(req,res,next)=>{
//     try {
//         let data = {
//             categoryId:req.body.categoryId
//         }
//         if(req.file && req.file.filename){
//             data.icon = req.file.filename
//         }
//         else{
//             data.icon = req.body.promotionIcon
//         }
    
//         let update = await bookModels.updatepromotionandofferbyid(req.body._id,data)
//         return R(res,true,"Data updated successfully!!",{},200)
//     } catch (error) {
//         next(error)
//     }
// }
// BookModel.deletePromotionAndOfferById = async(req,res,next)=>{
//     try {
//         const { id } = req.body
//         let get = await bookModels.deletepromotionandofferbyid(id)
//         return R(res,true,"Data removed successfully!!",{},200) 
//     } catch (error) {
//         next(error)
//     }
    
// }
// BookModel.addAdminInformation = async(req,res,next)=>{
//     try {
//         let get = await bookModels.getadmininformation()
//     if(get.length>0){
//         return R(res,true,"Data already available!!",{},200)
//     }
//     let datas={
//         ...req.body,
//         userId:req.doc.userId
//     }
//     let add = await bookModels.addadmininformation(datas)
//     return R(res,true,"Data added successfully!!",{},200)
//     } catch (error) {
//         next(error)
//     }
// }
// BookModel.getAdminInformation = async(req,res,next)=>{
//     try {
//         let get = await bookModels.getadmininformation()
//         return R(res,true,"Data found successfully",get,200)
//     } catch (error) {
//         next(error)
//     }
  
// }
// BookModel.updateAdminInformation = async(req,res,next)=>{
//     try {
//         let data = {
//             emailId:req.body.emailId,
//             mobileNumber:req.body.mobileNum,
//             address:req.body.address,
//             whatsAppNumber:req.body.whatsAppNumber
//         }
//         console.log("adminifnoupdate",req.bodys)
//         let add = await bookModels.updateadmininformation(req.body.id,data)
//         return R(res,true,"Data updated successfully",{},200)
//     } catch (error) {
//      next(error)   
//     }
// }
// BookModel.getAllEBooks = async(req,res,next) => {
//     try {
//         let get = await bookModels.getallebooks(req.body)
//         return R(res,true,"Data found successfully",get,200)
//     } catch (error) {
//      next(error)   
//     }
 
// }
module.exports = OrderModel