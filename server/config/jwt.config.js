const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET_KEY

module.exports.authenticate = (req, res, next) => {
    //verify cookie from controller
    jwt.verify(req.cookies.userToken, SECRET, (err, payload) => {
        //payload is the object in the first argument of our jwt.sign({}) from the controller
        if (err) {
            console.log("This is the error: ", err)
            res.status(401).json({ verified: false }) //unauthorized
        }
        else {
            console.log("Authenticated")
            console.log("This is the payload: ", payload)
            req.jwtpayload = payload;
            next()
        }
    })
}