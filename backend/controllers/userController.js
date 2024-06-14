import { user } from "../models/userModel.js"
import bcrypt from "bcrypt"
import { getToken } from "../utils/token.js"


export const register = async (req, res) => {
    const { userName, email, password } = req.body

    if (!userName || !email || !password) {
        return res.send("fill all the data")
    }

    const registeredUser = await user.findOne({ email });
    if (registeredUser) {
        return res.send("user exists")
    }

    const hashedPass = await bcrypt.hash(password, 10)
    const userData = await user.create({ userName, email, password: hashedPass })

    res.send({
        success: true,
        message: "user registered",
        userData
    })
    console.log("connection success")
}

export const login = async (req, res) => {
    const { email, password } = req.body

    const loginUser = await user.findOne({ email })

    if (!loginUser) return res.send("user not found")

    // res.send({
    //     success: true,
    //     message: "Login success", loginUser
    // })

    getToken(loginUser, 200, res, "token generated")
}