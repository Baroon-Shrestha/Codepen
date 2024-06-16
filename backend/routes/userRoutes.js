import Express from "express";
import { register, login } from "../controllers/userController.js";
import { isAuthorized } from "../middlewares/Auth.js";

const router = Express.Router()

router.post("/register", register)
router.post("/login", login)

export default router;