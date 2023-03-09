import student from "../../models/student/student-model"
import staff from "../../models/staff/staff-model";
import { validationResult, matchedData } from 'express-validator'
import multer from "../../helpers/Multer"
import { response } from "express";
// create student
async function createstaff(req, res, next) {

    const staf = new staff({
        _id: req.body.id,
        name: req.body.name,
        department: req.body.department,
        gender: req.body.gender,
        email: req.body.email,
        level: req.body.level,
        username: req.body.username,
        password: req.body.password,
    })
    await staf.save((error, result) => {
        if (error) {
            res.send(error)
        }
        else {
            res.send("Staff saved")
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
    res.send(staffs)
}
async function deletestaff(req, res, next) {
    const staffs = await staff.findOneAndDelete({
        _id: req.body.id
    })
    res.send(staffs)
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
    res.send(staffs)
}

export default {
    createstaff,
    getallstaff,
    updatestaff,
    deletestaff,
}