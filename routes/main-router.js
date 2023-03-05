import express from "express"

const router=express.Router();

import studentrouter from "./student-router"
router.use('/student',studentrouter);




export default router;