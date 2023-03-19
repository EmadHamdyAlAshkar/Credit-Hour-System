import express from "express"
import authController from "../controlers/project/auth-controller"


const router = express.Router();

router.post('/login',authController.login)

export default router