import mongoose from "mongoose";
import bcrypt from "bcrypt"
import validator from "validator";
import jwt from "jsonwebtoken"

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: [true, "please enter your name"],
        minLength: [3, "Name cannot be this short"],
        maxLength: [30, "Name cannot be this long"]
    },
    email: {
        type: String,
        required: [true, "please enter your email"],
        validate: [validator.isEmail, "the email you entered is incorrect"]
    },
    password: {
        type: String,
        required: [true, "please enter your password"]
    }
})

userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SCERET_KEY, {
        expiresIn: process.env.JWT_EXPIRY_DATE
    })
}

export const user = mongoose.model("user", userSchema)