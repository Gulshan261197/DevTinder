const mongoose = require('mongoose');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userSchema = mongoose.Schema({
    firstName: { 
        type: String
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String
    },
    password: {
        type: String
    },
    age: {
        type: Number
    },
    gender: {
        type: String
    }
})

userSchema.methods.getJWT = async function() {
    const token = await jwt.sign({_id: this._id}, "Dev@Tinder$1997", {
        expiresIn: "7d",
    })
    return token;
}

userSchema.methods.validatePassword = async function(passwordInputByUser) {
    const user = this;
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, user.password);
    
    return isPasswordValid;
}

const User = mongoose.model("User",userSchema)
module.exports = User;