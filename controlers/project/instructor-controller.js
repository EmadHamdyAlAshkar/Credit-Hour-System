import student from "../../models/student/student-model"
import instructor from "../../models/instructor/instructor-model";
import courses from "../../models/course/course-model"
import { validationResult, matchedData } from 'express-validator'
import multer from "../../helpers/Multer"
import { response } from "express";
import bcrypt from "bcrypt"
// create instructor
async function createinstructor(req, res, next) {

  const instruct = new instructor({
    _id: req.body._id,
    name: req.body.name,
    qualification: req.body.qualification,
    gender: req.body.gender,
    email: req.body.email,
    mobile: req.body.mobile,
    username: req.body.username,
    password: req.body.password,
    isInstructor: req.body.isInstructor,
  })
  const saltrounds = 10
  instruct.password = await bcrypt.hash(instruct.password, saltrounds)
  await instruct.save((error, result) => {
    if (error) {
      res.send(error)
    }
    else {
      res.json({status:"true",message:"Instructor saved"})
    }
  });
}
async function getallinstructors(req, res, next) {
  let obj = {}
  if ("name" in req.body) {
    obj.name = { $regex: req.body.name }
  }
  if ("gender" in req.body) {
    obj.gender = req.body.gender
  }
  const instructors = await instructor.find(obj).populate("courses"," name -prerequisites -_id")
  res.json({data:instructors})
}
async function deleteinstructor(req, res, next) {
  const instruct = await instructor.findOne({_id:req.body.id})
  if(!instruct){
    return res.json({status:"false",message:"Instructor not found"})
  }
  const instructors = await instructor.findOneAndDelete({
    _id: req.body.id
  })
  res.json({status:"true",message:"Instructor deleted"})
}
async function updateinstructor(req, res, next) {
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

  const instructors = await instructor.findOneAndUpdate({
    _id: req.body.id
  }, obj)
  res.send(instructors)
}
async function enrollcourse(req, res) {
  let instrucorid = req.body.instrucorid
  let courseid = req.body.courseid
  let instruct = await instructor.findOne({
    _id: instrucorid
  }
  )
  let course = await courses.findOne({
    _id: courseid
  })
  if (!instruct) {
    return res.json({massage:"The instructor not found"})
  }
  if(!course){
    return res.json({massage:"Course not found"})
  }
  else {
    let reg = false
    await Promise.all(instruct.courses.map(async (cours) => {
      console.log(cours);
      if (cours === courseid) {
        reg = true
      }
    }))
    if (reg) {
      return res.json({message:"Course " + course.name + " already found in " + instruct.name + " courses"})
    }
  }
  instruct.courses.push(courseid);
  await instruct.save();
  return res.json({status:"true",massage: "Course added",data:course})

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
  createinstructor,
  getallinstructors,
  updateinstructor,
  deleteinstructor,
  enrollcourse,
}