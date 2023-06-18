import express from "express"
import examController from "../controlers/project/exam-controller";

const router = express.Router();

router.post('/createexam',examController.createexam)
router.get('/getallexam',examController.getallexam)
router.post('/showexamforstudent',examController.showexamforstudent)
router.delete('/deleteallexams',examController.deleteallexams)




export default router;