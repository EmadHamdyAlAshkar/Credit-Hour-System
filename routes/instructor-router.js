import express from "express"
import student_conltroler from "../controlers/project/student-controler";
import instructor_Controller from "../controlers/project/instructor-controller";
import project_validator from "../controlers/project/student-validator";
import multer from "../helpers/Multer";

const router=express.Router();

router.post('/createinstructor',instructor_Controller.createinstructor)
router.get('/getallinstructors',instructor_Controller.getallinstructors)
router.put('/updateinstructor',instructor_Controller.updateinstructor)
router.delete('/deleteinstructor',instructor_Controller.deleteinstructor)
export default router;