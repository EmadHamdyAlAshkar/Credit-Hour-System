import student from "../../models/student/student-model"
import courses from "../../models/course/course-model"
import { validationResult, matchedData } from 'express-validator'
import multer from "../../helpers/Multer"
import { response } from "express";
// create student
async function createstudent(req, res, next) {

  const stud = new student({
    _id: req.body.id,
    name: req.body.name,
    department: req.body.department,
    gender: req.body.gender,
    email: req.body.email,
    level: req.body.level,
    username: req.body.username,
    password: req.body.password,
  })
  await stud.save((error, result) => {
    if (error) {
      res.send(error)
    }
    else {
      res.send("Student saved")
    }
  });
}
async function getallstudents(req, res, next) {
  let obj = {}
  if ("name" in req.body) {
    obj.name = { $regex: req.body.name }
  }
  if ("gender" in req.body) {
    obj.gender = req.body.gender
  }
  const students = await student.find(obj).all()
  res.send(students)
}
async function deletestudent(req, res, next) {
  const students = await student.findOneAndDelete({
    _id: req.body.id
  })
  res.send(students)
}
async function updatestudent(req, res, next) {
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
  
  const students = await student.findOneAndUpdate({
    _id: req.body.id
  }, obj)
  res.send(students)
}
async function registercourse(req, res, next){
let studid= req.body.studid
let courseid = req.body.courseid
let stud= await student.findOne({
_id: studid
}
)
let course=await courses.findOne({
  _id:courseid
})

if (course.prerequisites.length!=0){
  course.prerequisites.map((pre)=>{
    if(pre in stud.finishedcourses)
    {
      console.log("found");
    }
    else{res.send(`course ${pre} not found in your finished courses`)}
  })
}
res.send("course registered")

}

/*
let valid=validationResult(req)
    console.log(req.body)
    if(valid.isEmpty()){
        const fulldata=matchedData(req,{ includeOptionals: false })
        const proj=new project({
          name:req.body.name,
          logo:req.files.logo[0].path,
          background:req.files.background[0].path
          ,category:req.body.category
        })
        proj.save((error, result) => {
            if (error) {
              console.log(error)
              
              res.send(error)
            }
            else {
              console.log(result)
              res.send(proj)
            }
          })
    }
    else{
        res.send(valid)
    } */



/*
this line return the image
http://localhost:3000//images//others//background-1676542868642_up_design_ps.jpg
*/


// find project
// find all projects
async function find_all_projects(req, res, next) {
  let x = NaN
  let obj = {}
  const { sort, limit, skip } = project.check_query(req)
  if ('name' in req.body) {
    obj.name = { $regex: req.body.name }
  }
  // x = await project.find(obj).sort({}).all()
  console.log(`obj==> ${obj.name} \n sort==> ${sort} \n limit==> ${limit} \n skip==> ${skip} `)
  x = await project.find(obj).sort(sort).limit(limit).skip(skip).all()
  res.send(x)
}

// update project
async function update_project(req, res, next) {
  const projectid = req.body.id

  let data = {}
  if ('name' in req.body) {
    data.name = req.body.name

  }
  const x = await project.findOneAndUpdate({ _id: projectid }, data).catch((error) => {
    res.send(error)
  })
  res.send(x)
}
// delete project
async function delete_project(req, res, next) {
  const projectid = req.body.id
  const proj = await project.findOne({ _id: projectid })
  let paths = []
  paths.push(proj.logo)
  paths.push(proj.background)
  multer.delete_img(paths)
  await project.deleteOne({ _id: projectid })
  res.send("Done!!!")
  console.log("done")
}

export default {
  createstudent,
  getallstudents,
  updatestudent,
  deletestudent
}