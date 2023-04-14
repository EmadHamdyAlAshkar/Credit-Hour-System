import student from "../../models/student/student-model"
import courses from "../../models/course/course-model"



async function registercoursetest(req, res, next) {
    let studid = req.body.studid
    let stud = await student.findOne({
        _id: studid
      })
    let courseid = req.body.courseid
    let cors =[]
    cors = req.body.courseid.replace('[', '').replace(']', '').split(',')

    await Promise.all(cors.map(async(cours)=>{
        let course = await  courses.findOne({
          _id: cours
        })
        if (!stud) {
          return await res.send("that student of id : "+studid+" is not found!")
        }
        if(!course){
         return await res.send("Course "+cours+" not found")
        }}))
return res.send("last")


}




export default {
    
    registercoursetest
  }