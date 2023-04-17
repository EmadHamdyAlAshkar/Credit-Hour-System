import student from "../../models/student/student-model"
import courses from "../../models/course/course-model"



async function registercoursetest(req, res, next) {
  let studid = req.body.studid
  let stud = await student.findOne({
    _id: studid
  })

  let cors = []
  cors = req.body.courseid.replace('[', '').replace(']', '').split(',')
  if (!stud) {
    return await res.json({ message: "that student of id : " + studid + " is not found!" })
  }
  await Promise.all(cors.map(async (cours) => {
    let course = await courses.findOne({ _id: cours })

    if (course) {
      let registered = false
      console.log("hre");
      await Promise.all(stud.currentcourses.map(async (curntcourse) => {
        if (curntcourse._id == cours) {
          console.log("hrwwe");

          registered = true
        }

      }))
      let finished = false
      await Promise.all(stud.finishedcourses.map(async (finshdcourse) => {
        if (finshdcourse._id == cours) {
          console.log("hrwwwe");

          finished = true
        }

      }))

      if (registered || finished) {
        if (registered) {
          return await res.json({ message: "already registered" })
        } else {
          return await res.json({ message: "already passed" })
        }
      }
      let foundprerequisite = false
      if(course.prerequisites.length != 0){
        await Promise.all(course.prerequisites.map(async(pre)=>{
          stud.finishedcourses.map(async(finished)=>{
            if(finished.id == pre._id){
              console.log("foundpre");
              foundprerequisite = true
            }
          })
          if(foundprerequisite){
            console.log("foundpreeee");
            // await Promise.all(stud.currentcourses.map(async(current)=>{
              
            // }))
            console.log("push"+cours.length);
              
              stud.currentcourses.push(course)
              await stud.save();
              console.log("pushed");

             res.send("course registered")

          }
        }))
      }

      
    } else {
      res.json({ message: "Course of Id: " + cours + " not found" })

    }



  }))




}




export default {

  registercoursetest
}