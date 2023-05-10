import express from "express"
import StudentCourseGradeController from "../controlers/project/StudentCourseGrade-controller"

const router=express.Router();



router.post('/createStudentCourseGrade',StudentCourseGradeController.creatStudentCourseGrade)
router.post('/getallStudentCourseGrade',StudentCourseGradeController.getallStudentCourseGrade)
router.put('/updateStudentCourseGrade',StudentCourseGradeController.updateStudentCourseGrade)
router.post('/getStudentCourseGradebycoursename',StudentCourseGradeController.getStudentCourseGradebycoursename)

export default router;