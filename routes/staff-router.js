import express from "express"
import student_conltroler from "../controlers/project/student-controler";
import staff_Controler from "../controlers/project/staff-controler";
import project_validator from "../controlers/project/student-validator";
import multer from "../helpers/Multer";

const router = express.Router();

router.post('/createstaff', staff_Controler.createstaff)
router.get('/getallstaff', staff_Controler.getallstaff)
router.put('/updatestaff', staff_Controler.updatestaff)
router.delete('/deletestaff', staff_Controler.deletestaff)
export default router;