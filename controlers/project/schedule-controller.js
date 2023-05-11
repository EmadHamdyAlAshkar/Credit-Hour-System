import schedule from "../../models/schedule/schedule-model";
import student from "../../models/student/student-model"



async function createschedule(req, res, next) {
    const schedul = await schedule.findOne({ course: req.body.course })
    if (schedul) {
        return res.json({ message: "Schedule already exists" })
    }
    const scheduleee = new schedule({
        course: req.body.course,
        day: req.body.day,
        hour: req.body.hour,
        hall: req.body.hall
    })
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

    let schedulesss
    let schedules = await Promise.all(stud.currentcourses.map(async(current)=>{
        schedulesss = await schedule.find({course:current}).populate("course","name")
        return schedulesss

    }))
    res.json({data:schedules})


}


export default {
    createschedule,
    getallschedule,
    showscheduleforstudent

}