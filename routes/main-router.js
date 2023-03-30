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

import authrouter from "./auth-router"
router.use("/",authrouter)

import profilerouter from ".//profile-router"
router.use("/",profilerouter)

import userrouter from "./user-router"
router.use("/user",userrouter) 

import adminrouter from "./admin-router"
router.use("/admin",adminrouter)

export default router;