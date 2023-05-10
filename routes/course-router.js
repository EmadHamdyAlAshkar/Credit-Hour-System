import express from "express"
import course_Controller from "../controlers/project/course-controller"

const router = express.Router();

router.post('/createcourse',course_Controller.createcourse)
router.get('/getallcourse',course_Controller.getallcourse)
router.put('/updatecourse',course_Controller.updatecourse)
router.delete('/deletecourse',course_Controller.deletecourse)
router.post('/getcoursebyid',course_Controller.getcoursebyid)

export default router;