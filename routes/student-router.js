import express from "express"
import student_conltroler from "../controlers/project/student-controler";
import project_validator from "../controlers/project/student-validator";
import multer from "../helpers/Multer";
import auth from "../middleware/auth-middleware"
import staff from "../middleware/staff-middleware"
import student from "../middleware/student-middleware"
const router=express.Router();

router.post('/createstudent',[auth,staff],student_conltroler.createstudent)
router.get('/getallstudents',[auth,staff],student_conltroler.getallstudents)
router.get('/getonestudent',[auth,staff],student_conltroler.getonestudent)
router.put('/updatestudent',student_conltroler.updatestudent)
router.delete('/deletestudent',[auth,staff],student_conltroler.deletestudent)
router.post('/registercourse',student_conltroler.registercourse)
router.post('/enrollcourse',student_conltroler.enrollcourse)

export default router;