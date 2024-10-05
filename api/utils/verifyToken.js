var jwt = require("jsonwebtoken");

// var apiResponse = require("../helpers/apiResponses");
const verifyJWT = (req, res, next) => {
    // console.log("req.headers.authorization",req.headers.authorization);
    try {

        jwt.verify(req.headers.authorization, process.env.JWT_SECRET, (err, verify) => {
            if (err) {                    
                    let err=new Error("Unauthorized")
                    err.status = 404;
                    throw err;
                
            } else {
                let decoded = jwt.decode(req.headers.authorization, {
                    complete: true
                });
                req.doc = decoded.payload;
                console.log(req.doc)
                next();
            }
        })
    } catch (e) {
        console.log(e)
        throw(e)
    }
}

module.exports = verifyJWT