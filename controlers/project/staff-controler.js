import student from "../../models/student/student-model"
import staff from "../../models/staff/staff-model";
import { validationResult, matchedData } from 'express-validator'
import multer from "../../helpers/Multer"
import { response } from "express";
import bcrypt from "bcrypt"

// create student
async function createstaff(req, res, next) {

    const staf = new staff({
        _id: req.body.id,
        name: req.body.name,
        qualification: req.body.qualification,
        gender: req.body.gender,
        email: req.body.email,
        mobile: req.body.mobile,
        username: req.body.username,
        password: req.body.password,
        isStaff: req.body.isStaff,
    })
    const saltrounds = 10
    staf.password = await bcrypt.hash(staf.password, saltrounds)
    await staf.save((error, result) => {
        if (error) {
            res.send(error)
        }
        else {
            res.json({status:"true",message:"Staff saved"})
        }
    });
}
async function getallstaff(req, res, next) {
    let obj = {}
    if ("name" in req.body) {
        obj.name = { $regex: req.body.name }
    }
    if ("gender" in req.body) {
        obj.gender = req.body.gender
    }
    const staffs = await staff.find(obj).all()
    res.json({data:staffs})
}
async function deletestaff(req, res, next) {
    const staffs = await staff.findOneAndDelete({
        _id: req.body.id
    })
    res.json({data:staffs})
}
async function updatestaff(req, res, next) {
    let obj = {}
    if ("name" in req.body) {
        obj.name = req.body.name
    }
    if ("email" in req.body) {
        obj.email = req.body.email
    }
    if ("password" in req.body) {
        obj.password = req.body.password
    }

    const staffs = await staff.findOneAndUpdate({
        _id: req.body.id
    }, obj)
    res.json({data:staffs})
}


// async function login(req,res) {
//     let staf = await staff.findOne({_id: req.body._id})
//     let stud = await student.findOne({_id: req.body._id,password: req.body.password})
//     if(staf){
//          res.send("Staff found")
//     }

//     else if(stud){
//         res.send("Student found")
//     }
//     else{
//         return res.status(404).send('Invalid email or password!')
//     }


// }


async function addstaff(req, res, next) {

    // const {error} = uservalidate(req.body)
    // if(error){
    //     return res.send(error.details.message)
    // }

    const staf = new staff(_.pick(req.body, ['_id', 'name', 'email', 'password', 'gender'])
        // {
        //     _id: req.body._id,
        //     name: req.body.name,
        //     department: req.body.department,
        //     gender: req.body.gender, 
        //     email: req.body.email,
        //     level: req.body.level,
        //     username: req.body.username,
        //     password: req.body.password,
        // }
    )
    const saltrounds = 10
    staf.password = await bcrypt.hash(staf.password, saltrounds)
    await staf.save((error, result) => {
        if (error) {
            res.send(error)
        }
        else {
            res.json({data:staf})
        }
    });
}
export default {
    createstaff,
    getallstaff,
    updatestaff,
    deletestaff,
    addstaff,

}