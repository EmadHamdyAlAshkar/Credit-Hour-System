import express from "express"
import student_conltroler from "../controlers/project/student-controler";
import staff_Controler from "../controlers/project/staff-controler";
import project_validator from "../controlers/project/student-validator";
import multer from "../helpers/Multer";
import auth from "../middleware/auth-middleware"
import staff from "../models/staff/staff-model";
import user from "../models/course/user/user-model";
import admin from "../middleware/admin-middleware"

const router = express.Router();

router.post('/createstaff',[auth,admin], staff_Controler.createstaff)
router.get('/getallstaff',[auth,admin],staff_Controler.getallstaff)
router.put('/updatestaff',[auth,admin], staff_Controler.updatestaff)
router.delete('/deletestaff',[auth,admin], staff_Controler.deletestaff)
// router.get('/profile',auth,async (req,res)=>{
//     const staffprofile = await staff.findById(req.user._id).select('-password')
//     const userprofile = await user.findById(req.user._id)
//     if(staffprofile){
//        return res.send(staffprofile)
//     }
//     else if(userprofile){
//        return res.send(userprofile)
//     }
    
//     res.send("no profile")

    
// })

export default router;