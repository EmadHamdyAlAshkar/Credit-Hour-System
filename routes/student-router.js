import express from "express"
import student_conltroler from "../controlers/project/student-controler";
import project_validator from "../controlers/project/student-validator";
import multer from "../helpers/Multer";
import auth from "../middleware/auth-middleware"
import staff from "../middleware/staff-middleware"
import student from "../middleware/student-middleware"
import registerConrtroller from "../controlers/project/register-conrtroller";
const router=express.Router();

router.post('/createstudent',student_conltroler.createstudent)
router.get('/getallstudents',student_conltroler.getallstudents)
router.get('/getonestudent',student_conltroler.getonestudent)
router.put('/updatestudent',student_conltroler.updatestudent)
router.delete('/deletestudent',[auth,staff],student_conltroler.deletestudent)
router.post('/registercourse',student_conltroler.registercourse)
router.post('/registercourse1',student_conltroler.registercourse1)
router.post('/enrollcourse',student_conltroler.enrollcourse)
router.post('/registercoursetest',registerConrtroller.registercoursetest)
router.get('/getstudentsbycourse',student_conltroler.getstudentsbycourse)
router.post('/getStudentsByCoursesId',student_conltroler.getStudentsByCoursesId)
router.post('/getavailablecourses',student_conltroler.getavailablecourses)
router.post('/showstudentreport',student_conltroler.showstudentreport)
router.post('/changepassword',student_conltroler.changepassword)

export default router;