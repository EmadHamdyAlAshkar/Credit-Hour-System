import schedule from "../../models/schedule/schedule-model";
import student from "../../models/student/student-model"
import instructor from "../../models/instructor/instructor-model";



async function createschedule(req, res, next) {
    const schedul = await schedule.findOne({ course: req.body.course })
    if (schedul) {
        return res.json({ message: "Schedule already exists" })
    }
    const instructoor = req.body.instructor
    const scheduleee = new schedule({
        course: req.body.course,
        day: req.body.day,
        hour: req.body.hour,
        hall: req.body.hall,
        instructor: instructoor
    })
    const instruct = await instructor.findOne({_id:instructoor})
    if(!instruct){
        return await res.json({status:"false",message:"Instructor not found"})
    }
    await scheduleee.save((error, result) => {
        if (error) {
          res.send(error)
        }
        else {
          res.json({ status: "true", message: "Schedule for "+scheduleee.course+" saved" })
    
        }
      });

}
async function getallschedule(req,res){
    const schedulee = await schedule.find()
    res.json({data:schedulee})
}

async function showscheduleforstudent(req,res){
    const studid = req.body.studid
    const stud = await student.findOne({_id:studid})
    if(!stud){
        res.json({message:"Student not found"})
    }

    let schedulesss
    let schedules = await Promise.all(stud.currentcourses.map(async(current)=>{
        schedulesss = await schedule.find({course:current}).populate("course","name").populate("instructor","name")
        return schedulesss

    }))

    let schedulee = []
    for(let scheduleeee of schedules){
        for(let scheduleeees of scheduleeee){
            schedulee.push(scheduleeees)
        }
    }

    res.json({data:schedulee})


}
async function showscheduleforinstructor(req,res){
    const instructorid = req.body.instructorid
    const instruct = await instructor.findOne({_id:instructorid})
    if(!instruct){
        res.json({message:"Instructor not found"})
    }

    let schedulesss
    let schedules = await Promise.all(instruct.courses.map(async(corse)=>{
        schedulesss = await schedule.find({course:corse}).populate("course","name").select("-instructor")
        return schedulesss

    }))

    let schedulee = []
    for(let scheduleeee of schedules){
        for(let scheduleeees of scheduleeee){
            schedulee.push(scheduleeees)
        }
    }

    res.json({data:schedulee})


}


async function updateschedule(req, res, next) {
    let obj = {}
    if ("day" in req.body) {
        obj.day = req.body.day
    }
    if ("hour" in req.body) {
        obj.hour = req.body.hour
    }
    if ("hall" in req.body) {
        obj.hall = req.body.hall
    }
    if ("instructor" in req.body) {
        obj.instructor = req.body.instructor
        const instruct = await instructor.findOne({_id:req.body.instructor})
        if(!instruct){
            return await res.json({message:"Instructor not found"})
        }
    }
    const schedules = await schedule.findOneAndUpdate({
        course: req.body.course
    }, obj)
    res.json({message:"Schedule updated successfully"})
}


export default {
    createschedule,
    getallschedule,
    showscheduleforstudent,
    showscheduleforinstructor,
    updateschedule

}