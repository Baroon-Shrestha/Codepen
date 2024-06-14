import jwt from "jsonwebtoken"
import { user } from "../models/userModel.js"

export const isAuthorized = async (req, res, next) => {
    const { token } = req.cookies

    if (!token) {
        return res.send("login to get full access")
    }

    try {
        const decodedId = jwt.verify(token, process.env.JWT_SCERET_KEY)
        req.user = await user.findById(decodedId.id)
        next()
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.send("invalid token")
        } else {
            return res.send("server error")
        }
    }
}