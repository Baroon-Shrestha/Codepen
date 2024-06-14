import Express from "express";
import { isAuthorized } from "../middlewares/Auth.js";
import { saveCode, viewAll, viewOne, viewYours } from "../controllers/codeController.js";

const router = Express.Router()

router.post("/save", isAuthorized, saveCode)
router.get("/view", viewAll)
router.get("/viewone/:id", viewOne)
router.get("/viewyours", isAuthorized, viewYours)

export default router