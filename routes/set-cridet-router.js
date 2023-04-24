import express from "express"
import setCridetcontroller from "../controlers/project/set-cridet"


const router=express.Router();

router.post('/setcridet',setCridetcontroller.setcridet)

export default router;
