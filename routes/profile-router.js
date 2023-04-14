import express from "express"
import auth from "../middleware/auth-middleware"
import staff from "../models/staff/staff-model";
import user from "../models/course/user/user-model";
import student from "../models/student/student-model";
import instructor from "../models/instructor/instructor-model";

const router = express.Router();


router.get('/profile',auth,async (req,res)=>{
    const staffprofile = await staff.findById(req.user._id).select('-password')
    const userprofile = await user.findById(req.user._id).select('-password')
    const studentprofile = await student.findById(req.user._id).select('-password')
    const instructorprofile = await instructor.findById(req.user._id).populate("courses","name -_id -prerequisites ").select('-password')
   
    if(staffprofile){
       return res.send(staffprofile)
    }
    else if(userprofile){
       return res.send(userprofile)
    }
    else if(studentprofile){
        return res.send(studentprofile)
     }
     else if(instructorprofile){
      return res.send(instructorprofile)
   }
    
    res.send("No profile founded")

    
})
export default router;