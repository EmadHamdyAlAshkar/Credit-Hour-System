import express from "express"
import project_conltroler from "../controlers/project/project-controler";
import project_validator from "../controlers/project/project-validator";
import multer from "../helpers/Multer";

const router=express.Router();

router.post('/createproject',multer.Upload_images,project_validator.create_validations,project_conltroler.createproject)
router.get('/getallprojects',project_conltroler.find_all_projects)
router.patch('/updateproject',project_conltroler.update_project)
router.delete('/deleteproject',project_conltroler.delete_project)
export default router;