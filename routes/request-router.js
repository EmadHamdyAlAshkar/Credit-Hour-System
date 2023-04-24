import express from "express"
import requestController from "../controlers/project/request-controller";
const router=express.Router();

router.post('/createrequest',requestController.createrequest)

export default router;
