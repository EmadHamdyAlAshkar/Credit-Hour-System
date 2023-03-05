import express from "express"
import student_conltroler from "../controlers/project/student-controler";
import project_validator from "../controlers/project/student-validator";
import multer from "../helpers/Multer";

const router=express.Router();

router.post('/createstudent',student_conltroler.createstudent)
router.get('/getallstudents',student_conltroler.getallstudents)
router.put('/updatestudent',student_conltroler.updatestudent)
router.delete('/deletestudent',student_conltroler.deletestudent)
export default router;