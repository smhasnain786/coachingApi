const express = require("express")
const app = express();
const cors = require('cors')
const bodyparser = require("body-parser");
const dotenv = require('dotenv');
const http = require('http');
const db = require("./utils/dbConn");
const mongoose = require("mongoose");
// const apiResponse = require("../utils/apiResponses");
// const AppErr = require("../utils/error");
//const { x } = require("pdfkit");
const adminRoutes = require("./routes/admin.routes")
const path = require('path');
const BookRoutes = require("./routes/book.routes")
const AuthRoutes = require("./routes/auth.routes")
const NewsRoutes = require("./routes/news.routes")
const SupportRoutes = require("./routes/support.routes")
const socialMediaRoutes = require("./routes/socialmedia.routes")
const profileRoutes = require("./routes/profile.routes")
const currentAffairs = require("./routes/currentAffairs.routes")
const testSeries = require("./routes/testseries.routes")
const typing = require("./routes/typing.routes")
const design = require("./routes/design.routes")
const dataTranslate = require("./routes/datatranslate.routes")
const previousYearPaper = require("./routes/previousYearPaper.routes")
const Orders = require("./routes/order.routes")



// app.use(express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
dotenv.config();
app.use(cors());
app.use("/auth/createSecure",adminRoutes)
app.use("/book",BookRoutes)
app.use("/auth",AuthRoutes)
app.use("/support",SupportRoutes)
app.use("/news",NewsRoutes)
app.use("/socialmedia",socialMediaRoutes)
app.use("/profile",profileRoutes)
app.use("/currentAffairs",currentAffairs)
app.use("/testSeries",testSeries)
app.use("/typing",typing)
app.use("/design",design)
app.use("/datatranslate",dataTranslate)
app.use("/paper",previousYearPaper)
app.use("/order",Orders)


const server = new http.createServer({}, app);
server.listen(8002, () => { console.log(`Server Started Listening on port 8002`) });