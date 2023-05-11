const UserModel = require('../models/user.model')
//connect this secret vairable to our .env file
const secret = process.env.SECRET_KEY
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

module.exports = {

    registerUser: async (req, res) => { //use async await when you have a lot of logic
        try { //check if user exists first
            const potentialUser = await UserModel.findOne({ email: req.body.email })
            if (potentialUser) {
                res.status(400).json({ message: "Email Address is taken" })
            }
            else {
                //actually create user if they pass check
                const newUser = await UserModel.create(req.body)

                //generates a jsonwebtoken string
                const userToken = jwt.sign(
                    { _id: newUser._id, email: newUser.email }, //cookie payload for browser
                    secret, //this will be used as a key to verify cookie creation (jwt sign)
                    { expiresIn: '2h' } //browser will clear the cookie after two hours
                )

                res
                    .status(201)
                    .cookie(
                        'userToken',
                        userToken,
                        { httpOnly: true, maxAge: 2 * 60 * 60 * 1000 }) //sets to 72million seconds for cookie age
                    .json(newUser) //succesful creation of user and cookie

            }
        }
        catch (err) { //bad request
            res.status(400).json(err) //differs from Cadens
        }
    },

    loginUser: async (req, res) => {
        try {
            //check if user exists
            const user = await UserModel.findOne({ email: req.body.email })
            if (user) { //waits for user variable
                //check to see if password entered matches password in DB
                const passwordsMatch = await bcrypt.compare(req.body.password, user.password)
                if (passwordsMatch) { //they match!
                    //generate the userToken
                    const userToken = jwt.sign({ _id: user._id, email: user.email }, secret, { expiresIn: '2h' })
                    //log the user in
                    // res.cookie('userToken', userToken)
                    
                    
                    console.log("test")
                    
                }
                else { //passwords don't match but email does
                    res.status(400).json({ message: "Invalid email/password combination" })
                }
            }
            //if user does not exist
            else {
                res.status(400).json({ message: "Invalid email/password combination" })
            }
        }
        catch (err) {
            res.status(400).json(err) //differs from Caden's
        }
    },

    logoutUser: (req, res) => {
        res.clearCookie('userToken').json({ message: "Logged out" })
    },

    getLoggedInUser: (req, res) => {
        //we added to the req object the payload from the jwt config file
        UserModel.findOne({ _id: req.jwtpayload._id })
            .then((user) => {
                console.log(user);
                res.status(200).json(user)
            })
            .catch((err) => {
                console.log("Get Logged In User: ", err);
                res.status(400).json(err)
            })
    },

    getUser: (req, res) => {
        res.json({ _id: "Hello World" })
    }

}