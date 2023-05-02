const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { isEmail } = require('validator') //Caden introduced this as an alternative to regex

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please enter your first name"]
    },
    lastName: {
        type: String,
        required: [true, "Please enter your last name"]
    },
    email: {
        type: String,
        required: [true, "Please enter a valid email"],
        validate: [isEmail, 'Invalid Email'] //from validator email dependency
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minLength: [8, "Password must be at least 8 characters"]
    }
}, { timestamps: true })

//Middleware Begins!
UserSchema.virtual('confirmPassword') //not stored: calculated before it hits DB
    .get(() => this.confirmPassword)
    .set((virtualConfirmPassword) => this.confirmPassword = virtualConfirmPassword)

UserSchema.pre('validate', function (next) { //Pre Save Middleware "before saving"
    if (this.password !== this.confirmPassword) { //check password value against confirmPassword value
        this.invalidate('confirmPassword', "Passwords Don't Match") //marks path as invalid causing it to fail
    }
    next() //now run .pre('save')
})

UserSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10) //will salt this.password 10 times
        .then((hash) => {
            this.password = hash //reassigning password sent to the DB as *salted/hashed* value
            next() //now send values to DB
        })
})

const User = mongoose.model('User', UserSchema)
module.exports = User