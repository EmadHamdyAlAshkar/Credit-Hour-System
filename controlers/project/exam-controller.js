import exam from "../../models/exam/exam-model"
import student from "../../models/student/student-model"



async function createexam(req, res, next) {
    const exm = await exam.findOne({ course: req.body.course })
    if (exm) {
        return res.json({ message: "Exam already exists" })
    }
    const exaam = new exam({
        course: req.body.course,
        day: req.body.day,
        hour: req.body.hour,
        hall: req.body.hall
    })
    await exaam.save((error, result) => {
        if (error) {
          res.send(error)
        }
        else {
          res.json({ status: "true", message: "Exam for "+exaam.course+" saved" })
    
        }
      });

}
async function getallexam(req,res){
    const exaam = await exam.find()
    res.json({data:exaam})
}

async function showexamforstudent(req,res){
    const studid = req.body.studid
    const stud = await student.findOne({_id:studid})
    if(!stud){
        res.json({message:"Student not found"})
    }

    let examsss
    let exams = await Promise.all(stud.currentcourses.map(async(current)=>{
        examsss = await exam.find({course:current}).populate("course","name")
        return examsss

    }))

    let exaam = []
    for(let exaaaam of exams){
        for(let exaaaams of exaaaam){
            exaam.push(exaaaams)
        }
    }

    res.json({data:exaam})


}

async function deleteallexams(req,res){

const exams = await exam.deleteMany()

res.json({message:"Okkkkkk"})

}




export default {
    createexam,
    getallexam,
    showexamforstudent,
    deleteallexams

}