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

import addexceluser from "../controlers/project/excel-controller"
router.use ("/excel",addexceluser)

import requestrouter from "./request-router"
router.use("/request",requestrouter)

import setcridet from "./set-cridet-router"
router.use("/setcridet",setcridet)

export default router;