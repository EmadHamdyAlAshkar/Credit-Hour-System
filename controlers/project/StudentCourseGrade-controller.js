import StudentCourseGrade from "../../models/studentCourseGrade/studentCourseGrade-model";
import courses from "../../models/course/course-model";

async function creatStudentCourseGrade(req, res, next) {

    const studgrade = new StudentCourseGrade({
        gradeid: req.body.gradeid,
        student: req.body.student,
        course: req.body.course,
        midtermGrade: req.body.midtermGrade,
        practicalGrade: req.body.practicalGrade,
        finalGrade: req.body.finalGrade,
        gradegpa: req.body.gradegpa,
        gradeletter: req.body.gradeletter
  
    })
    
    await studgrade.save((error, result) => {
      if (error) {
        res.send(error)
      }
      else {
        res.json({ status: "true", message: "Student grade saved" })
  
      }
    });

}


async function getallStudentCourseGrade(req, res, next) {
    // let studid = req.body.studid
    // let reques = await request.find({studentcode : studid})
    const studgrades = await StudentCourseGrade.find()
    .populate("course","name hours -prerequisites")
    .populate("student","name -finishedcourses -currentcourses")
    // if(!studid){
    //   return await res.json({data:requests})

    // }
    // if (reques.length==0) {
    //   return await res.json({message:"No requests founded"})
    // }
    res.json({data:studgrades})
  }
  async function getStudentCourseGradebycoursename(req, res, next) {
    const courseName = req.body.courseName;
  
  
    const course = await courses.findOne({ name: courseName });
    const coursegrade = await StudentCourseGrade.find({ course: course })
  
    return res.json({ data: { coursegrade: coursegrade } })
    // const courseId = courses._id;
  
    //   const students = await student.find({ currentcourses: courseId });
  
    //  res.json({data:course});
  }


  async function updateStudentCourseGrade(req, res, next) {
    let obj = {}
    if ("gradeid" in req.body) {
        obj.gradeid = req.body.gradeid
    }
    if ("email" in req.body) {
        obj.email = req.body.email
    }
    if ("password" in req.body) {
        obj.password = req.body.password
    }

    const studgrades = await StudentCourseGrade.findOneAndUpdate({
        _id: req.body._id
    }, obj)
    res.json({data:studgrades})
}

export default{
    creatStudentCourseGrade,
    getallStudentCourseGrade,
    updateStudentCourseGrade,
    getStudentCourseGradebycoursename
}
