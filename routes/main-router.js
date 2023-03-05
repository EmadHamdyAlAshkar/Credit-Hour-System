import express from "express"

const router=express.Router();

import projectrouter from "./project-router"
router.use('/project',projectrouter);

import multer from '../helpers/Multer'
router.post('/insertimage',multer.insert_image)
import imageControler from "../controlers/image/image-controler";
router.post('/Uploadimages',imageControler.upload_images)
router.delete('/deleteimages',imageControler.delete_images)


export default router;