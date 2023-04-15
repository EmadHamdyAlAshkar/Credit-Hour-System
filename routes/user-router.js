import express from "express"
import user_Controller from "../controlers/user-controller"
import auth from "../middleware/auth-middleware"
import staff from "../middleware/staff-middleware"

const router = express.Router()

router.post('/createuser',[auth,staff],user_Controller.createuser)

export default router;