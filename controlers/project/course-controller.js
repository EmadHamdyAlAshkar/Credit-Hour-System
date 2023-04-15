import course from "../../models/course/course-model";


async function createcourse(req, res, next) {

    let obj={
        _id: req.body.code,
        name: req.body.name,
        department: req.body.department,
        hours: req.body.hours,
        code: req.body.code,
        semester: req.body.semester,
        
    }
    if( 'prerequisites' in req.body){
        let pres=[]
        pres=req.body.prerequisites.replace('[','').replace(']','').split(',')
        pres.map(async (pre)=>{
            let found =await course.exists({_id:pre})
            console.log(await course.findOne({_id:pre}));
            if(!found){
                res.send("this course not exist : ",pre)
            }
        })
        obj.prerequisites=pres
    }
    const corse = new course(obj)
    console.log(corse)
    await corse.save((error, result) => {
        if (error) {
            res.send(error)
        }
        else {
            
            res.json({status : "true",message : "Added course"})
        }
    });
}
async function getallcourse(req, res, next) {
    
    let obj = {}
    if ("name" in req.body) {
        obj.name = { $regex: req.body.name }
    }
    
    const courses = await course.find(obj).all()
    // new line
    res.json({data :courses})}
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