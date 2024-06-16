import { user } from "../models/userModel.js";
import bcrypt from "bcrypt";
import { getToken } from "../utils/token.js";

export const register = async (req, res) => {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
        return res.status(400).send("Please fill all the data");
    }

    try {
        const registeredUser = await user.findOne({ email });
        if (registeredUser) {
            return res.status(400).send("Email is already taken");
        }

        const hashedPass = await bcrypt.hash(password, 10);
        const userData = await user.create({ userName, email, password: hashedPass });

        getToken(userData, 201, res, "User registered and token generated successfully");
    } catch (error) {
        return res.status(500).send("Failed to register user");
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const loginUser = await user.findOne({ email });

        if (!loginUser) {
            return res.status(404).send("User not found");
        }

        const isPasswordValid = await bcrypt.compare(password, loginUser.password);

        if (!isPasswordValid) {
            return res.status(401).send("Invalid password");
        }

        getToken(loginUser, 200, res, "Logged in and Token generated successfully");
    } catch (error) {
        return res.status(500).send("Failed to login");
    }
};
