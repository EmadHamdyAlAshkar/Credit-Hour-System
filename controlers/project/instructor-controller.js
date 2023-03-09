import student from "../../models/student/student-model"
import instructor from "../../models/instructor/instructor-model";
import { validationResult, matchedData } from 'express-validator'
import multer from "../../helpers/Multer"
import { response } from "express";
// create instructor
async function createinstructor(req, res, next) {

  const instruct = new instructor({
    _id: req.body.id,
    name: req.body.name,
    qualification: req.body.qualification,
    gender: req.body.gender,
    email: req.body.email,
    mobile: req.body.mobile,
    username: req.body.username,
    password: req.body.password,
  })
  await instruct.save((error, result) => {
    if (error) {
      res.send(error)
    }
    else {
      res.send("Instructor saved")
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
  const instructors = await instructor.find(obj).all()
  res.send(instructors)
}
async function deleteinstructor(req, res, next) {
  const instructors = await instructor.findOneAndDelete({
    _id: req.body.id
  })
  res.send(instructors)
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
  deleteinstructor
}