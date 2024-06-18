import Express from "express";
import { isAuthorized } from "../middlewares/Auth.js";
import { saveCode, viewAll, viewOne, viewYours, deleteCode, updateCode, updateTitle } from "../controllers/codeController.js";

const router = Express.Router()

router.post("/save", isAuthorized, saveCode)
router.get("/view", viewAll)
router.get("/viewone/:id", viewOne)
router.get("/viewyours", isAuthorized, viewYours)
router.delete("/delete/:id", isAuthorized, deleteCode)
router.put("/update/:id", isAuthorized, updateCode)
router.put("/updatetitle/:id", isAuthorized, updateTitle)

export default router