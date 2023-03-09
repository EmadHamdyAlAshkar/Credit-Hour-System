import express from "express"

const router=express.Router();

import studentrouter from "./student-router"
router.use('/student',studentrouter);

import staffrouter from "./staff-router"
router.use('/staff',staffrouter);

import courserouter from "./course-router"
router.use('/course',courserouter);

import instructorrouter from "./instructor-router"
router.use('/instructor',instructorrouter);


export default router;