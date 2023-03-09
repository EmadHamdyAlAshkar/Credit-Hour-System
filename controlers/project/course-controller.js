import course from "../../models/course/course-model";


async function createcourse(req, res, next) {

    const corse = new course({
        _id: req.body.id,
        name: req.body.name,
        department: req.body.department,
        hours: req.body.hours,
        day: req.body.day,
        time: req.body.time,
        hall: req.body.hall,

    })
    await corse.save((error, result) => {
        if (error) {
            res.send(error)
        }
        else {
            res.send("Course saved")
        }
    });
}
async function getallcourse(req, res, next) {
    let obj = {}
    if ("name" in req.body) {
        obj.name = { $regex: req.body.name }
    }
    
    const courses = await course.find(obj).all()
    res.send(courses)
}
async function deletecourse(req, res, next) {
    const courses = await course.findOneAndDelete({
        _id: req.body.id
    })
    res.send(courses)
}
async function updatecourse(req, res, next) {
    let obj = {}
    if ("name" in req.body) {
        obj.name = req.body.name
    }
    if ("department" in req.body) {
        obj.department = req.body.department
    }
    if ("hours" in req.body) {
        obj.hours = req.body.hours
    }
    if ("day" in req.body) {
        obj.day = req.body.day
    }
    const courses = await course.findOneAndUpdate({
        _id: req.body.id
    }, obj)
    res.send(courses)
}

export default {
    createcourse,
    getallcourse,
    updatecourse,
    deletecourse,
}