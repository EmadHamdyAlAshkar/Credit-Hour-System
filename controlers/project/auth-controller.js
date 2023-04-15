import  Express  from "express"
import mongoose from "mongoose"
import bcrypt from "bcrypt"
import _ from "lodash"
import  Jwt  from "jsonwebtoken"
import generateTokens from '../../models/course/user/user-model'
import admin from "../../models/admin/admin-model"
import student from "../../models/student/student-model"
import staff from "../../models/staff/staff-model"
import user from "../../models/course/user/user-model"
import instructor from "../../models/instructor/instructor-model"

// async function login(req,res) {
//     let usr
//     let staf = await staff.findOne({_id: req.body._id,password: req.body.password})
//     let stud = await student.findOne({_id: req.body._id,password: req.body.password})
//     if(staf){
//          res.send("Hello "+staf.name+" you are staff")
//     }
   
//     else if(stud){
//         res.send("Hello "+stud.name+" you are student")
//     }
//     else{
//         return res.status(404).send('Invalid email or password!')
//     }
    

// }
// export default{login}


// async function login(req,res) {
//     let usr = await user.findOne({_id: req.body._id})
    
//     if(!usr){
//         return res.status(404).send('Invalid email or password!')
//     }
    
//     const checkpassword = await bcrypt.compare(req.body.password,usr.password)
//     if(!checkpassword){
//         return res.status(404).send('Invalid email or password!')
//     }
//     // const token = Jwt.sign({_id:usr._id},"privatekey")
//     const token = usr.generateTokens()
//     res.send('Hello '+usr.name+" "+token+" you are user")

// }
async function login(req,res) {
    let usr = await user.findOne({_id: req.body._id})
    let staf = await staff.findOne({_id: req.body._id})
    let stud = await student.findOne({_id: req.body._id})
    let admn = await admin.findOne({username: req.body.username})
    let instruct = await instructor.findOne({_id: req.body._id})
    if(usr){
        const checkpassword = await bcrypt.compare(req.body.password,usr.password)
        if(!checkpassword){
            return res.status(404).send('Invalid email or password!')
        }    
        const token = usr.generateTokens()
    res.send('Hello '+usr.name+" "+token+" you are user")
    }
    else if(staf){
        const checkpassword = await bcrypt.compare(req.body.password,staf.password)
        if(!checkpassword){
            return res.status(404).send('Invalid email or password!')
        }    
        const token = staf.generateTokens()
    // res.send('Hello '+staf.name+" "+token+" you are staff")
    res.json({status: "true",message : "Login successful",type: "Staff" ,token :token})

    }
    else if(stud){
        const checkpassword = await bcrypt.compare(req.body.password,stud.password)
        if(!checkpassword){
            return res.status(404).send('Invalid email or password!')
        }    
        const token = stud.generateTokens()
    res.json({status: "true",message : "Login successful",type: "Student" ,token :token})
    }
    else if(admn){
        const checkpassword = await bcrypt.compare(req.body.password,admn.password)
        if(!checkpassword){
            return res.status(404).send('Invalid email or password!')
        }    
        const token = admn.generateTokens()
    res.send('Hello '+admn.username+" "+token+" you are admin")
    }
    else if(instruct){
        const checkpassword = await bcrypt.compare(req.body.password,instruct.password)
        if(!checkpassword){
            return res.status(404).send('Invalid email or password!')
        }    
        const token = instruct.generateTokens()
        res.json({status: "true",message : "Login successful",type: "Instructor" ,token :token})
    }
    
    // const token = Jwt.sign({_id:usr._id},"privatekey")
    else{
        res.send("not found")
    }

}

export default{login}

