import express from "express"
import scheduleController from "../controlers/project/schedule-controller"

const router = express.Router();

router.post('/createschedule',scheduleController.createschedule)
router.get('/getallschedule',scheduleController.getallschedule)
router.post('/showscheduleforstudent',scheduleController.showscheduleforstudent)
router.post('/showscheduleforinstructor',scheduleController.showscheduleforinstructor)




export default router;