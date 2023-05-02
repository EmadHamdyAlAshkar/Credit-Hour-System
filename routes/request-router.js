import express from "express"
import requestController from "../controlers/project/request-controller";
const router=express.Router();

router.post('/createrequest',requestController.createrequest)
router.get('/getallrequests',requestController.getallrequests)
router.get('/getrequestbystudentid',requestController.getrequestbystudentid)
router.get('/getpendingrequests',requestController.getpendingrequests)


export default router;
