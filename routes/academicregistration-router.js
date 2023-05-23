import express from "express"
import academicRegistrationController from "../controlers/project/academic-registration-controller";

const router = express.Router();

// router.post('/createacademicregistration',academicRegistrationController.createacademicregistration)
router.post('/registerationactivation',academicRegistrationController.registerationactivation)
router.get('/showacademicregistrationstatus',academicRegistrationController.showacademicregistrationstatus)





export default router;